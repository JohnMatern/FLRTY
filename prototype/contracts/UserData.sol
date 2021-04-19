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

    function setName(string memory name_) external onlyUser {
        string memory name = _toLower(name_);
        require(resolveName[name] == address(0x0),"name already exist");
        require(keccak256(bytes(resolveAddress[msgSender()])) == keccak256(bytes("")),"address already has username");
        resolveName[name] = msgSender();
        resolveAddress[msgSender()] = name;
    }
    function getName(address user) external view returns (string memory) {
        return resolveAddress[user];
    }
    function getAddress(string memory user) external view returns (address) {
        return resolveName[_toLower(user)];
    }

    function setWhitelist(address newWhitelist) public onlyWhitelist {
        whitelist = newWhitelist;
    }
    
   function _toLower(string memory str) internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        for (uint i = 0; i < bStr.length; i++) {
            // Uppercase character...
            if ((uint8(bStr[i]) >= 65) && (uint8(bStr[i]) <= 90)) {
                // So we add 32 to make it lowercase
                bLower[i] = bytes1(uint8(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }
    
}