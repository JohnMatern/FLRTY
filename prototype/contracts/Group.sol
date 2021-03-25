// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./lib/EIP712MetaTransaction.sol";

contract FunctionsG {
    function isManager(address) public view returns(bool) {}
    function isUser(address) public view returns(bool) {}
    function isAdmin(address) public view returns(bool) {}
}

contract Group is EIP712MetaTransaction {
   string public name;
   address public creator;
   string public shortDesc;
   address[] public users;
   mapping(address => uint256) public userIndex;
   address whitelist;
   
    constructor (address creator_, string memory name_, string memory shortDesc_, address newWhitelist) EIP712MetaTransaction("Flarity Group", "1") {
        name = name_;
        creator = creator_;
        shortDesc = shortDesc_;
        users.push(creator_);
        whitelist = newWhitelist;
    }
    
    modifier onlyManager() { require(FunctionsG(whitelist).isManager(msg.sender), "msg.sender is not manager"); _; }
    modifier onlyAdmin() { require(FunctionsG(whitelist).isAdmin(msg.sender), "msg.sender is not admin"); _; }
    modifier onlyUser() { require(FunctionsG(whitelist).isUser(msg.sender), "msg.sender is not user"); _; }
    modifier onlyCreator() { require(msgSender() == creator,"msg.sender is not creator"); _;}
    modifier onlyWhitelist() { require(msgSender() == whitelist); _; }

    function addUser(address user_) external onlyManager {
        require(userIndex[user_] == 0, "user already in list");
        users.push(user_);
        userIndex[user_] = users.length-1;
    }
    
    function addMultipleUsers(address[] memory users_) external onlyManager {
        for(uint i = 0; i < users_.length; i++) {
            if(userIndex[users_[i]] > 0) {
                users.push(users_[i]);
                userIndex[users_[i]] = users.length-1;
            }
        }
    }
    
    function removeUser(address user) external onlyManager {
        require((msgSender() == creator) || (msgSender() == user),"msg.sender is not creator");
        delete users[userIndex[user]];
    }
    
    function setCreator(address newCreator) external onlyUser onlyCreator {
        creator = newCreator;
    }
    
    function isUser(address user) public view returns(bool) {
        return (userIndex[user] > 0) || (creator == user);
    }
    
    function isCreator(address user) public view returns(bool) {
        return creator == user;
    }
    
    function clear() external onlyUser onlyCreator {
        name = "";
        creator = address(0);
        shortDesc = "";
        delete users;
    }
    
    function setName(string memory newName) external onlyUser onlyCreator {
        name = newName;
    }
    
    function setDesc(string memory newDesc) external onlyUser onlyCreator {
        shortDesc = newDesc;
    }    

    function getName() public view returns (string memory) {
        return name;
    }
    
    function getDesc() public view returns(string memory)  {
        return shortDesc;
    }    
    
    function getCreator() public view returns(address) {
        return creator;
    }
    
    function getUserList() public view returns(address[] memory) {
        return users;
    }
    
    function setWhitelist(address newWhitelist) external onlyWhitelist {
        whitelist = newWhitelist;
    }
}