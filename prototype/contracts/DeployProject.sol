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
    
    function createProject(string memory name, address sender, string memory shortDesc, uint256 minVotes, address group, uint256 week) public onlyManager returns(address) {
        return address(new Project(name, sender, shortDesc, minVotes, group, whitelist, week));
    }
    
    function setWhitelist(address newWhitelist) external onlyWhitelist {
        whitelist = newWhitelist;
    }
    
    function getName(address project) public view returns (string memory) {
        return Project(project).getName();
    }
    
    function getDesc(address project) public view returns(string memory)  {
        return Project(project).getDesc();
    }    

    function getCreator(address project) public view returns(address) {
        return Project(project).getCreator();
    }
    
    function getEndDate(address project) public view returns(uint256) {
        return Project(project).getEndDate();
    }

    function getMinVotes(address project) public view returns(uint256) {
        return Project(project).getMinVotes();
    }
    
    function getGroup(address project) public view returns(address) {
        return Project(project).getGroup();
    }
}