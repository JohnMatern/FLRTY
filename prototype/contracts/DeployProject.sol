// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./Project.sol";

contract Functions {
    function isManager(address) public view returns(bool) {}
    function isUser(address) public view returns(bool) {}
    function isAdmin(address) public view returns(bool) {}
}


contract DeployProject {
    address public whitelist;
    constructor(address newWhitelist) {
        whitelist = newWhitelist;
    }
    
    modifier onlyWhitelist() { require(msg.sender == whitelist, "msg.sender is not manager"); _; }
    modifier onlyManager() { require(FunctionsP(whitelist).isManager(msg.sender), "msg.sender is not manager"); _; }
    
    function createProject(string memory name, address sender, string memory shortDesc, uint256 minVotes, address group) public onlyManager returns(address) {
        return address(new Project(name, sender, shortDesc, minVotes, group));
    }
    
    function setWhitelist(address newWhitelist) external onlyWhitelist {
        whitelist = newWhitelist;
    }
}