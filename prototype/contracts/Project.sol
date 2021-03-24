// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./lib/EIP712MetaTransaction.sol";

contract FunctionsP {
    function isManager(address) public view returns(bool) {}
    function isUser(address) public view returns(bool) {}
    function isAdmin(address) public view returns(bool) {}
}

contract Project is EIP712MetaTransaction {
    string public name;
    address public creator;
    address public group;
    string public shortDesc;
    uint public endDate;
    uint256 public minVotes;
    address whitelist = 0x4F177Ef371DE589B2574c070f05D24d9f9839A1d;
   
    constructor (string memory newName, address newCreator, string memory newDesc, uint256 newMinVotes, address newGroup) EIP712MetaTransaction("Flarity Project", "1") {
        name = newName;
        creator = newCreator;
        shortDesc = newDesc;
        endDate = block.timestamp + 7 days;
        minVotes = newMinVotes;  
        group = newGroup;
    }
    
    modifier onlyManager() { require(FunctionsP(whitelist).isManager(msg.sender), "msg.sender is not manager"); _; }
    modifier onlyAdmin() { require(FunctionsP(whitelist).isAdmin(msg.sender), "msg.sender is not admin"); _; }
    modifier onlyUser() { require(FunctionsP(whitelist).isUser(msg.sender), "msg.sender is not user"); _; }
    modifier onlyCreator() { require(msgSender() == creator,"msg.sender is not creator"); _;}
    modifier onlyWhitelist() { require(msgSender() == whitelist); _; }

    function endNow() external onlyAdmin {
        endDate = block.timestamp;
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
    
    function getEndDate() public view returns(uint256) {
        return endDate;
    }

    function getMinVotes() public view returns(uint256) {
        return minVotes;
    }
    
    function getGroup() public view returns(address) {
        return group;
    }
        
    function setWhitelist(address newWhitelist) external onlyWhitelist {
        whitelist = newWhitelist;
    }
}