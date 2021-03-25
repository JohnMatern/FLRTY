// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./lib/EIP712MetaTransaction.sol";

contract Functions {
    function isManager(address) public view returns (bool) {}
    function isOwner(address) public view returns (bool) {}
    function getVoteSupply() public view returns(uint256) {}
}

contract Store is EIP712MetaTransaction {
    address whitelist;

    address[] public activeProjects;
    uint256[] public freeProjectSlots;
    address[] public oldProjects;
    mapping(address => uint256) public slotHistory;
    mapping(address => mapping(address => uint256)) public voteHistory; // Project => (User => voteCount)
    
    address[] public groups;
    mapping(address => address[]) public userGroups;
    mapping(address => uint256) public groupIndex;

    address[] public users;
    mapping(address => bool) public canMintVote;

    constructor(address whitelistAddress) EIP712MetaTransaction("Flarity Store", "1") {
        whitelist = whitelistAddress;
    }

    modifier onlyManager() {
        require(Functions(whitelist).isManager(msgSender()), "msgSender() is not manager");
        _;
    }
    modifier onlyWhitelist() {
        require(msgSender() == whitelist || Functions(whitelist).isOwner(msgSender()), "msgSender() is not allowed to use this function");
        _;
    } 

    function pushUser(address user) public onlyWhitelist {
        users.push(user);
    }

    function allowAllUserMintVoteInitSupply() public onlyManager {
        for(uint256 i; i<users.length; i++) {
            canMintVote[users[i]] = true;
        }
    }
    function canMint(address user) public view returns(bool) {
        return canMintVote[user];
    }
    function removeCanMint(address user) public onlyManager {
        canMintVote[user] = false;
    }

    function addNewProject(address newProject) public onlyManager {
        bool set = false;
        for (uint256 i = 0; i < freeProjectSlots.length; i++) {
            // add project address on first free slot of activeProjects
            if (freeProjectSlots[i] != uint256(-1)) {
                uint256 slot = freeProjectSlots[i];
                activeProjects[slot] = newProject;
                slotHistory[newProject] = slot;
                freeProjectSlots[slot] = uint256(-1);
                set = true;
            }
        }
        if (!set) {
            activeProjects.push(newProject); // push newProject address, if there is no free slot
            slotHistory[newProject] = activeProjects.length - 1;
        }
    }
    function getProjectList() public view returns(address[] memory) {
        return activeProjects;
    }
    function getOldProjectList() public view returns (address[] memory) {
        return oldProjects;
    }

    function freeSlot(address oldProject) public onlyManager {
        oldProjects.push(oldProject);
        uint256 slot = slotHistory[oldProject];
        bool set = false;
        activeProjects[slot] = address(0);
        for (uint256 i; i < freeProjectSlots.length; i++) {
            if (freeProjectSlots[i] == uint256(-1)) {
                freeProjectSlots[i] = slot;
                set = true;
            }
        }
        if (!set) {
            freeProjectSlots.push(slot);
        }
    }

    function addVoteHistory(address project, address sender, uint256 amount) public onlyManager {
        voteHistory[project][sender] += amount;
    }
    function getVoteHistory(address project, address user) public view returns(uint256) {
        return voteHistory[project][user];
    }

    function newGroup(address group, address creator) public onlyManager {
        groups.push(group);
        groupIndex[group] = groups.length-1;
        userGroups[creator].push(group);
    }

    function addGroupToUser(address group, address user) public onlyManager {
        userGroups[user].push(group);
    }
    
    function removeGroupFromUser(address group, address user) public onlyManager {
        for(uint i; i < userGroups[user].length; i++) {
            if(userGroups[user][i] == group) {
                userGroups[user][i] = address(0); 
            }
        }
    }
    
    function removeGroup(address group, address user) public onlyManager {
        for(uint i; i < userGroups[user].length; i++) {
            if(userGroups[user][i] == group) {
                userGroups[user][i] = address(0); 
            }
        }
        groups[groupIndex[group]] = address(0);
        groupIndex[group] = 0;
    }
    
    function getGroups() public view returns(address[] memory) {
        return groups;
    }    
    function getUserGroups(address user) public view returns(address[] memory) {
        return userGroups[user];
    }    
    function isGroup(address group) public view returns(bool) {
        return groupIndex[group] != 0;
    }

    function setWhitelist(address newWhitelist) public onlyWhitelist {
        whitelist = newWhitelist;
    }
}
