// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;

contract Whitelist {

    address public owner;

    address public store;
    address public groupManager;
    address public projectManager;
    address public usermanager;
    address public currency;
    address public vote;

    uint256 public currencySupply;
    uint256 public voteSupply;

    mapping(address => bool) public admins; // admin list
    mapping(address => bool) public accessHubs; // accessHub list
    mapping(address => bool) public users; // user whitelist
    mapping(bytes32 => bool) public inviteCodes; // invite code list

    function addAdmin(address) public {}
    function removeAdmin(address) public {}
    function isAdmin(address) public view returns(bool) {}

    function addAccessHub(address) public {}
    function removeAccessHub(address) public {}
    function isAccessHub(address) public view returns(bool) {}

    function addUser(address) public {}
    function removeUser(address) public {}
    function isUser(address) public view returns(bool) {}

    function addInviteCode(bytes32) public {}
    function removeInviteCode(bytes32) public {}
    function addMultipleInviteCodes(bytes32[] memory) public {}
    function addUserByCode(string memory) public {}
    function isInviteCode(string memory) public view returns(bool) {}

    function setOwner(address) public {}

    function setStore(address) public {}
    function isStore(address) public view returns(bool) {}
    function getStore() public view returns(address) {}

    function setGroupManager(address) public {}
    function isGroupManager(address) public view returns(bool) {}
    function getGroupManager() public view returns(address) {}
    
    function setProjectManager(address) public {}
    function isProjectManager(address) public view returns(bool) {}
    function getProjectManager() public view returns(address) {}
    
    function setUserManager(address) public {}
    function isUserManager(address) public view returns(bool) {}
    function getUserManager() public view returns(address) {}

    function getCurrency() public view returns(address) {}
    function getVote() public view returns(address) {}

    function initAddresses(address, address, address, address, address, address) public {}
    function setNewWhitelist(address) public {}
}