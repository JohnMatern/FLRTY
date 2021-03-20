// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;

import "./CurrencyCoin.sol";
import "./VoteToken.sol";
import "./Project.sol";

contract Gov {
   address public owner;
   uint256 public oneToken = 100;
   
   mapping(address => bool) public admins;          // admin list
   mapping(address => bool) public accessHubs;      // accessHub list
   mapping(address => bool) public userWhitelist;   // user whitelist
   mapping(bytes32 => bool) internal inviteCodes;   // invite code list
   
   uint256 internal initSupply;
   uint256 internal voteTokenAmount;
   
   CurrencyCoin internal currency;
   VoteToken internal voteToken;
   uint256 public conversionFactor;
   
   address[] public activeProjects;
   uint256[] internal freeProjectSlots;
   mapping(address => uint256) private slotHistory;
   mapping(address => mapping(address => uint256)) private voteHistory; // Project => (User => voteCount)
   
   constructor () {
       owner = msg.sender;
       admins[msg.sender] = true;
       accessHubs[msg.sender] = true;
       userWhitelist[msg.sender] = true;
       freeProjectSlots.push(0);         // init removedProjects[0] = 0
       conversionFactor = 10;
       initSupply = 100;
   }
   
   modifier onlyOwner()             { require(owner == msg.sender,                          "msg.sender is not owner");              _; }
   modifier onlyAdmin()             { require(admins[msg.sender] == true,                   "msg.sender is not admin");              _; }
   modifier onlyAccessHub()         { require(accessHubs[msg.sender] == true,               "msg.sender is not accessHub");          _; }
   modifier onlyUser()              { require(userWhitelist[msg.sender] == true,            "msg.sender is not User");               _; }
   modifier onlyAdminOrAccessHub()  { require(admins[msg.sender] || accessHubs[msg.sender], "msg.sender is not admin or accessHub"); _; }
   
   
   //
   // administrative functions
   //
   function initToken(address _currency, address _voteToken) public onlyOwner {
       currency = CurrencyCoin(_currency);
       voteToken = VoteToken(_voteToken);
   }
   
   function setInitSupply(uint256 amount) public onlyAdmin { initSupply = amount; }
   function getInitSupply() public view onlyAdmin returns(uint256) { return initSupply; }
   
   function setVoteTokenAmount(uint256 amount) public onlyAdmin { voteTokenAmount = amount; }
   function getVoteTokenAmount() public view onlyAdmin returns(uint256) { return voteTokenAmount; }
   
   function setConversionFactor(uint256 factor) public onlyAdmin { conversionFactor = factor; }
   function getConversionFactor() public view onlyAdmin returns(uint256) { return conversionFactor; }
   
   function removeCommunityRestriction() public onlyOwner { currency.removeCommunityRestriction(); }
   function setTokenGov(address newGov) public onlyOwner { currency.setGov(newGov); voteToken.setGov(newGov); }
   
   //
   // whitelist functions
   //
   function addAdmin(address newAdmin) public onlyAdmin { admins[newAdmin] = true; }
   function removeAdmin(address oldAdmin) public onlyAdmin { delete admins[oldAdmin]; }
   
   function addAccessHub(address accessHub) public onlyAdmin { accessHubs[accessHub] = true; addUser(accessHub); sendInitialCurrencySupply(accessHub);}
   function removeAccessHub(address accessHub) public onlyAdmin { delete accessHubs[accessHub]; }
   
   function addUser(address user) public onlyAdminOrAccessHub { 
       userWhitelist[user] = true; 
       sendVoteToken(user);
   }
   function addUserByCode(string memory code) public { 
       require(inviteCodes[keccak256(abi.encodePacked(code))] == true,"invite code is invalid"); 
       delete inviteCodes[keccak256(abi.encodePacked(code))];
       userWhitelist[msg.sender] = true; 
       sendVoteToken(msg.sender);
   }
   function removeUser(address user) public onlyAdminOrAccessHub { delete userWhitelist[user]; }
   function isUser(address user) external view returns(bool) { return userWhitelist[user]; }
   
   function addInviteCode(bytes32 code) public onlyAdmin { inviteCodes[code] = true; }
   function addMultipleCodes(bytes32[] memory codes) public onlyAdmin { for(uint i=0; i < codes.length; i++) { inviteCodes[codes[i]] = true; } }
   function removeInviteCode(bytes32 code) public onlyAdmin { delete inviteCodes[code]; }
   
   
   //
   // initial supplies: currency + token
   //
   function sendInitialCurrencySupply(address recipient) private {
       require(accessHubs[recipient] == true, "initial currency supply recipient is no accessHub");
       currency.mintInitSupply(recipient, initSupply*oneToken);
   }
   
   function sendVoteToken(address recipient) private {
       require(userWhitelist[recipient] == true, "initial currency supply recipient is no accessHub");
       voteToken.mintToken(recipient, voteTokenAmount);
   }


   //
   // Project functions
   //
   
   function createProject(string memory name, string memory shortDesc, uint256 minVotes) public onlyUser {
       address newProject = address(new Project(name, msg.sender, shortDesc, minVotes));
       bool set = false;
       for(uint i = 0; i < freeProjectSlots.length; i++) {           // add project address on first free slot of activeProjects
           if(freeProjectSlots[i] != uint(-1)) {
               uint256 slot = freeProjectSlots[i];
                 activeProjects[slot] = newProject;
                 slotHistory[newProject] = slot;
                 freeProjectSlots[slot] = uint(-1);
                 set = true;
           }
       }
       if(!set) {
           activeProjects.push(newProject);                         // push newProject address, if there is no free slot
           slotHistory[newProject] = activeProjects.length-1;
       }
   }
   
   function freeSlot(address oldProject) internal {
       uint256 slot = slotHistory[oldProject];
       bool set = false;
       activeProjects[slot] = address(0);
       for(uint i; i < freeProjectSlots.length; i++) {
           if(freeProjectSlots[i] == uint(-1)) {
               freeProjectSlots[i] = slot;
               set = true;
           }
       }
       if(!set) {
           freeProjectSlots.push(slot);
       }
   }
   
   function getProjectList() public view onlyUser() returns(address[] memory) {
       return activeProjects;
   }
   
   function voteForProject(address project, uint256 amount) public onlyUser {
       require(voteToken.balanceOf(msg.sender) >= amount, "user amount of vote token to low");
       require(
           (voteHistory[project][msg.sender] == 0 && amount == 1) || (voteHistory[project][msg.sender]**2 == amount),
           "wrong amount of voting token"
           );
        require(Project(project).endDate() <= block.timestamp, "project runtime expired ");
       voteToken.transferToken(msg.sender, project, amount);
       voteHistory[project][msg.sender] += amount;
   }
   
   function endProject(address project) public onlyUser {
       require(Project(project).creator() == msg.sender, "msg.sender is not project creator");
       require(Project(project).endDate() >= block.timestamp, "can't end project, because project is active");
       freeSlot(project);
       uint256 voteCount = voteToken.balanceOf(project);
       voteToken.burnToken(project, voteCount);
       if(Project(project).minVotes() >= voteCount) currency.fundProject(msg.sender, voteCount*oneToken*conversionFactor);
   }

    function demoEndProject(address project) public onlyAdmin {
       Project(project).endNow();
    }
    
    function projectCanReceive(address project) external view returns(bool) {
        return(Project(project).endDate() >= block.timestamp);
    }

}