// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./Group.sol";

contract FunctionsD {
    function isManager(address) public view returns(bool) {}
    function isUser(address) public view returns(bool) {}
    function isAdmin(address) public view returns(bool) {}
}


contract DeployGroup {
    address public whitelist;
    constructor(address newWhitelist) {
        whitelist = newWhitelist;
    }
    
    modifier onlyWhitelist() { require(msg.sender == whitelist, "msg.sender is not manager"); _; }
    modifier onlyManager() { require(FunctionsD(whitelist).isManager(msg.sender), "msg.sender is not manager"); _; }
    
    function createGroup( address sender, string memory name, string memory shortDesc) public onlyManager returns(address) {
        return address(new Group(sender, name, shortDesc));
    }
    
    function setWhitelist(address newWhitelist) external onlyWhitelist {
        whitelist = newWhitelist;
    }
}