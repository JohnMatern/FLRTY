// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;

import "./CurrencyCoin.sol";
import "./VoteToken.sol";

contract Gov {
   address public owner;
   
   mapping(address => bool) public admins;          // admin list
   mapping(address => bool) public accessHubs;      // accessHub list
   mapping(address => bool) public userWhitelist;   // user whitelist
   mapping(bytes32 => bool) internal inviteCodes;   // invite code list
   
   uint256 internal initSupply;
   uint256 internal voteTokenAmount;
   
   CurrencyCoin internal currency;
   VoteToken internal voteToken;
   
   struct Group {
       address ownedBy;
       string name;
       address[] users;
   }
   
   mapping(address => string) public userGroups;
   mapping(string => uint256) public groupId;
   Group[] public groups;
   
   constructor () {
       owner = msg.sender;
       admins[msg.sender] = true;
       accessHubs[msg.sender] = true;
       userWhitelist[msg.sender] = true;
       Group storage g;
       g.ownedBy = msg.sender;
       g.name = "Admin";
       g.users.push(msg.sender);
       groups.push(g);
   }
   
   modifier onlyOwner()             { require(owner == msg.sender,                          "msg.sender is not owner");              _; }
   modifier onlyAdmin()             { require(admins[msg.sender] == true,                   "msg.sender is not admin");              _; }
   modifier onlyAccessHub()         { require(accessHubs[msg.sender] == true,               "msg.sender is not accessHub");          _; }
   modifier onlyUser()              { require(userWhitelist[msg.sender] == true,            "msg.sender is not User");               _; }
   modifier onlyAdminOrAccessHub()  { require(admins[msg.sender] || accessHubs[msg.sender], "msg.sender is not admin or accessHub"); _; }
   
   //
   // init functions
   //
   function initToken(address _currency, address _voteToken) public onlyOwner {
       currency = CurrencyCoin(_currency);
       voteToken = VoteToken(_voteToken);
   }
   
   function setInitSupply(uint256 amount) public onlyAdmin { initSupply = amount; }
   function getInitSupply() public view onlyAdmin returns(uint256) { return initSupply; }
   
   function setVoteTokenAmount(uint256 amount) public onlyAdmin { voteTokenAmount = amount; }
   function getVoteTokenAmount() public view onlyAdmin returns(uint256) { return voteTokenAmount; }
   
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
   
   function addInviteCode(bytes32 code) public onlyAdmin { inviteCodes[code] = true; }
   function addMultipleCodes(bytes32[] memory codes) public onlyAdmin { for(uint i=0; i < codes.length; i++) { inviteCodes[codes[i]] = true; } }
   function removeInviteCode(bytes32 code) public onlyAdmin { delete inviteCodes[code]; }
   
   
   //
   // initial supplies: currency + token
   //
   function sendInitialCurrencySupply(address recipient) private {
       require(accessHubs[recipient] == true, "initial currency supply recipient is no accessHub");
       currency.mintInitSupply(recipient, initSupply);
   }
   
   function sendVoteToken(address recipient) private {
       require(userWhitelist[recipient] == true, "initial currency supply recipient is no accessHub");
       voteToken.mintToken(recipient, voteTokenAmount);
   }
   
   //
   // group functions
   //
   function addGroup(string memory name) public onlyUser {
       require(groupId[name] == 0,"group already exists");
       Group storage g;
       g.name = name;
       g.ownedBy = msg.sender;
       groups.push(g);
       groupId[name] = groups.length-1;
   }
   
   function addUserToGroup(string memory name, address[] memory user) public onlyUser {
       require(groups[groupId[name]].ownedBy == msg.sender, "group is not owned by msg.sender");
       Group storage g = groups[groupId[name]];
       g.users.push(address);
   }
   
}