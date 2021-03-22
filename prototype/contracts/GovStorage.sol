// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./lib/EIP712MetaTransaction.sol";
import "./GovAddressManager.sol";

contract GovStorage is EIP712MetaTransaction {
    GovAddressManager public gov;
    mapping(address => bool) public admins; // admin list
    mapping(address => bool) public accessHubs; // accessHub list
    mapping(address => bool) public userWhitelist; // user whitelist
    mapping(bytes32 => bool) public inviteCodes; // invite code list

    mapping(string => address) public resolveName;
    mapping(address => string) public resolveAddress;
    
    mapping(address => address[]) public friends;
    mapping(address => string) public userPhoto;
    
    address[] public activeProjects;
    uint256[] public freeProjectSlots;
    mapping(address => uint256) public slotHistory;
    mapping(address => mapping(address => uint256)) public voteHistory; // Project => (User => voteCount)
    
    mapping(address => address[]) public userGroups;
    mapping(address => uint256) public groupIndex;
    address[] public groups;

    constructor(address govAddressManager) EIP712MetaTransaction("Flarity GovStorage", "1") {
        freeProjectSlots.push(0);
        groups.push(address(0));
        gov = GovAddressManager(govAddressManager);
    }

    modifier onlyGov() {
        require(msgSender() == gov.gov(), "msg.sender is not gov");
        _;
    }
    
    function addPhoto(address user, string memory photo) external onlyGov {
        userPhoto[user] = photo;
    }
    
    function removePhoto(address user) external onlyGov {
        delete userPhoto[user];
    }
    
    function getPhoto(address user) external view onlyGov returns (string memory) {
        return userPhoto[user];
    }
    
    function addFriend(address user, address newFriend) external onlyGov {
        friends[user].push(newFriend);
    }
    
    function removeFriend(address user, address oldFriend) external onlyGov {
        for(uint i; i < friends[user].length; i++) {
            if(friends[user][i] == oldFriend) {
                friends[user][i] = address(0);
            }
        }
    }
    
    function getFriends(address user) external view onlyGov returns(address[] memory) {
        return friends[user];
    }

    function getProjectList() external view onlyGov returns(address[] memory) {
        return activeProjects;
    }

    function addNewProject(address newProject) external onlyGov {
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

    function freeSlot(address oldProject) external onlyGov {
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

    function addVoteHistory(
        address project,
        address sender,
        uint256 amount
    ) external onlyGov {
        voteHistory[project][sender] += amount;
    }

    function addAdmin(address newAdmin) external onlyGov {
        admins[newAdmin] = true;
    }

    function removeAdmin(address oldAdmin) external onlyGov {
        delete admins[oldAdmin];
    }

    function addAccessHub(address accessHub) external onlyGov {
        accessHubs[accessHub] = true;
        addUser(accessHub); /*sendInitialCurrencySupply(accessHub);*/
    }

    function removeAccessHub(address accessHub) external onlyGov {
        delete accessHubs[accessHub];
    }

    function addUsertoWhitelist(address user) external onlyGov {
        addUser(user);
    }
    
    function addUser(address user) internal {
        userWhitelist[user] = true;
    }

    function addUserByCode(string memory code, address sender) external onlyGov {
        require(
            inviteCodes[keccak256(abi.encodePacked(code))] == true,
            "invite code is invalid"
        );
        delete inviteCodes[keccak256(abi.encodePacked(code))];
        userWhitelist[sender] = true;
    }

    function removeUser(address user) external onlyGov {
        delete userWhitelist[user];
    }

    function isUser(address user) external view returns (bool) {
        return userWhitelist[user];
    }

    function addInviteCode(bytes32 code) external onlyGov {
        inviteCodes[code] = true;
    }

    function addMultipleCodes(bytes32[] memory codes) external onlyGov {
        for (uint256 i = 0; i < codes.length; i++) {
            inviteCodes[codes[i]] = true;
        }
    }

    function removeInviteCode(bytes32 code) external onlyGov {
        delete inviteCodes[code];
    }

    function setName(string memory name, address sender) external onlyGov {
        resolveName[name] = sender;
        resolveAddress[sender] = name;
    }
    
    //
    // group functions
    //
    
    function newGroup(address group, address creator) external onlyGov {
        groups.push(group);
        groupIndex[group] = groups.length-1;
        userGroups[creator].push(group);
    }

    function addGroupToUser(address group, address user) external onlyGov {
        userGroups[user].push(group);
    }
    
    function removeGroupFromUser(address group, address user) external onlyGov {
        for(uint i; i < userGroups[user].length; i++) {
            if(userGroups[user][i] == group) {
                userGroups[user][i] = address(0); 
            }
        }
    }
    
    function removeGroup(address group, address user) external onlyGov {
        for(uint i; i < userGroups[user].length; i++) {
            if(userGroups[user][i] == group) {
                userGroups[user][i] = address(0); 
            }
        }
        groups[groupIndex[group]] = address(0);
        groupIndex[group] = 0;
    }
    
    function getGroups() external view onlyGov returns(address[] memory) {
        return groups;
    }
    
    function getUserGroups(address user) external view onlyGov returns(address[] memory) {
        return userGroups[user];
    }
    
    function isGroup(address group) external onlyGov returns(bool) {
        return groupIndex[group] != 0;
    }
    
    /*
    mapping(address => address[]) public userGroups;
    mapping(address => uint256) public groupIndex;
    address[] public groups; */
}
