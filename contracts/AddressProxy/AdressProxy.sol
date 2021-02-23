// SPDX-License-Identifier: MIT

pragma solidity <=0.8.0;


/**
 * @title AddressProxy
 * @author Kurt Merbeth </www.merbeth.io>
 * @notice Stores contract names and their addresses in a mapping.
 * @dev Addresses can be accessed by addresses["<contract name>"].
 *      In addition to the management of contract addresses in public 'addresses' mapping, several admins can be created and deleted. 
 *      The owner cannot be deleted from the admins mapping, but can be changed. 
 */
contract AddressProxy {

    address public owner;
    mapping(address => uint8) public admins;
    mapping(string => address) public addresses;
    
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
     * @dev Emitted when addresses mapping is modified.
     */
    event contractAddressModified(string eventName, string contractName, address contractAddress);
    
    /**
     * @dev Emitted when admins mapping is modified.
     */
    event adminModified(string eventName, address admin);
    
    /**
     * @dev Add a new contract address to addresses mapping.
     *      This function can only called by admins or owner.
     *      Emits an { contractAddressModified } event.
     * @param name The name of the contract to add.
     * @param contractAddress The address of the contract to add.
     */
    function addContractAddress(string memory name, address contractAddress) public isAdmin {
        addresses[name] = contractAddress;
        emit contractAddressModified("add", name, contractAddress);
    }
    
    /**
     * @dev Removes an address from addresses mapping.
     *      For this purpose the address of the sepcific contract is set to address(0) in addresses mapping.
     *      Emits an { contractAddressModified } event.
     * @param name The name of the contract to remove
     */
    function removeContractAddress(string memory name) public isAdmin {
        address cAddress = addresses[name];
        addresses[name] = address(0);
        emit contractAddressModified("remove", name, cAddress);
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