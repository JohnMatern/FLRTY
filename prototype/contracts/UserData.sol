// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./lib/EIP712MetaTransaction.sol";

contract Functions {
    function isUser(address) public view returns(bool) {}
    function isOwner(address) public view returns(bool) {}
}

contract UserData is EIP712MetaTransaction {    
    mapping(string => address) public resolveName;
    mapping(address => string) public resolveAddress;
    
    mapping(address => address[]) public friends;
    mapping(address => string) public userPhoto;

    address public whitelist;
    
    constructor(address whitelistAddress) EIP712MetaTransaction("Flarity UserData", "1") {
        whitelist = whitelistAddress;
    }
    
    modifier onlyUser() {
        require(Functions(whitelist).isUser(msgSender()), "msgSender() is not user");
        _;
    }
    modifier onlyWhitelist() {
        require(msgSender() == whitelist || Functions(whitelist).isOwner(msgSender()), "msgSender() is not allowed to use this function");
        _;
    }    
    
    function addPhoto(string memory photo) external onlyUser {
        userPhoto[msgSender()] = photo;
    }
    function removePhoto() external onlyUser {
        delete userPhoto[msgSender()];
    }
    function getPhoto(address user) external view returns (string memory) {
        return userPhoto[user];
    }
    
    function addFriend(address newFriend) external onlyUser {
        friends[msgSender()].push(newFriend);
    }
    function removeFriend(address oldFriend) external onlyUser {
        for(uint i; i < friends[msgSender()].length; i++) {
            if(friends[msgSender()][i] == oldFriend) {
                friends[msgSender()][i] = address(0);
            }
        }
    }
    function getFriends(address user) external view returns(address[] memory) {
        return friends[user];
    }

    function setName(string memory name) external onlyUser {
        resolveName[name] = msgSender();
        resolveAddress[msgSender()] = name;
    }
    function getName(address user) external view returns (string memory) {
        return resolveAddress[user];
    }
    function getAddress(string memory user) external view returns (address) {
        return resolveName[user];
    }

    function setWhitelist(address newWhitelist) public onlyWhitelist {
        whitelist = newWhitelist;
    }
    
}