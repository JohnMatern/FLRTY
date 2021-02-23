// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;

contract AddresslistManager {
    address public owner;
    mapping(address => uint8) public admins;
    mapping(bytes32 => mapping(address => bool)) public addresslists;
    mapping(bytes32 => bool) public nameTracking;
    
    /**
     * @dev Set owner to msg.sender and add msg.sender to admins mapping.
     */
    constructor () {
        owner = msg.sender;
        admins[msg.sender] = 1;
    }
    
    /**
     * @dev Modifier checks if msg.sender is in admin mapping or is owner
     *      of this smart contract.
     */
    modifier isAdmin() {
        require((admins[msg.sender] > 0) || (msg.sender == owner), "address is not in owner list.");
        _;
    }
    
    /**
     * @dev Modifier checks if msg.sender is owner
     */
    modifier isOwner() {
        require(msg.sender == owner, "msg.sender is not owner");
        _;
    }
     
   /**
     * @dev Emitted when admins mapping is modified.
     */
    event adminModified(string eventName, address admin);
    
    
    
    function newAddresslist(string memory name) public isAdmin {
        bytes32 byteName = stringToBytes32(name);
        require(nameTracking[byteName] != true, "list name already exists");
        addresslists[byteName][address(0)] = false;
        nameTracking[byteName] = true;
    }
    
    function addAddressTo(string memory name, address addr) public isAdmin {
        require(addresslists[stringToBytes32(name)][addr] != true, "address already in list");
        addresslists[stringToBytes32(name)][addr] = true;
    }
    
    function removeAddressfrom(string memory name, address addr) public isAdmin {
        require(addresslists[stringToBytes32(name)][addr] == true, "address not available");
        delete(addresslists[stringToBytes32(name)][addr]);
    }
    
    function checkEntry(string memory name, address addr) public view returns(bool) {
        require(nameTracking[keccak256(abi.encodePacked(name))] == true, "list name doesn't exist");
        return (addresslists[keccak256(abi.encodePacked(name))][addr]);
    }
    
    
    function stringToBytes32(string memory s) internal returns (bytes32) {
        return keccak256(abi.encodePacked(s));
    }
    
        /**
     * @dev Adds a new admin to admins mapping.
     *      Function can only called by admins or owner.
     *      An admin can't add itself twice
     *      Emits an { adminModified } event.
     * @param newAdmin Address of new admin.
     */      
    function addAdmin(address newAdmin) public isAdmin {
        require(msg.sender != newAdmin, "address of new admin and msg.sender are the same");
        admins[newAdmin] = 1;
        emit adminModified("new", newAdmin);
    }
    
    /**
     * @dev Removes an admin from admins mapping.
     *      Function can only called by admins or owner.
     *      Admins can't remove themself.
     *      Owner of this smart contract can't be removed drom admins list.
     *      Set admins[<address>] to 0.
     *      Emits an { adminModified } event.
     * @param oldAdmin The address to remove from admins list.
     */
    function removeAdmin(address oldAdmin) public isAdmin {
        require(msg.sender != oldAdmin, "you can't remove yourself");
        require(oldAdmin != owner, "owner can't removed from admin list");
        admins[oldAdmin] = 0;
        emit adminModified("rem", oldAdmin);
    }
    
    /**
     * @dev Overwrites the existing owner.
     *      Only the current owner can call this function.
     *      Adds new owner to admins list if necessary.
     *      Emits an { adminModified } event.
     * @param newOwner Address of the new owner.
     */
    function setOwner(address newOwner) public isOwner {
        owner = newOwner;
        if(admins[newOwner] == 0) {
            admins[newOwner] == 1;
        }
        emit adminModified("owner", newOwner);
    }
}