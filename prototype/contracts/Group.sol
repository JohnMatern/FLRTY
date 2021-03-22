// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./GovAddressManager.sol";

contract Group {
   GovAddressManager public gov;
   string public name;
   address public creator;
   string public shortDesc;
   address[] public users;
   mapping(address => uint256) public userIndex;
   
    constructor (
           address creator_,
           address gov_,
           string memory name_,
           string memory shortDesc_) {
        gov = GovAddressManager(gov_);
        name = name_;
        creator = creator_;
        shortDesc = shortDesc_;
        users.push(creator_);

    }
    
    modifier onlyGov() { require(msg.sender == gov.gov(), "msg.sender is not gov"); _; }
    
    function addUser(address user_) external onlyGov {
        require(userIndex[user_] > 0, "user already in list");
        users.push(user_);
        userIndex[user_] = users.length-1;
    }
    
    function addMultipleUsers(address[] memory users_) external onlyGov {
        for(uint i = 0; i < users_.length; i++) {
            if(userIndex[users_[i]] > 0) {
                users.push(users_[i]);
                userIndex[users_[i]] = users.length-1;
            }
        }
    }
    
    function removeUser(address user_) external onlyGov {
        delete users[userIndex[user_]];
    }
    
    function setCreator(address newCreator) external onlyGov {
        creator = newCreator;
    }
    
    function getUserList() external view onlyGov returns(address[] memory) {
        return users;
    }
    
    function isUser(address user) external view onlyGov returns(bool) {
        return (userIndex[user] > 0) || (creator == user);
    }
    
    function isCreator(address user) external view onlyGov returns(bool) {
        return creator == user;
    }
    
    function clear() external onlyGov {
        delete gov;
        name = "";
        creator = address(0);
        shortDesc = "";
        delete users;
    }
    
    function setName(string memory newName) external onlyGov {
        name = newName;
    }
    
    function setDesc(string memory shortDesc) external onlyGov {
        shortDesc = shortDesc;
    }
    
    
    
}