// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;

contract Project {
   address public gov;
   string public name;
   address public creator;
   string public shortDesc;
   uint public endDate;
   uint256 public minVotes;
   
    constructor (
           string memory name_,
           address creator_,
           string memory shortDesc_,
           uint256 minVotes_) {
               
        gov = msg.sender;
        name = name_;
        creator = creator_;
        shortDesc = shortDesc_;
        endDate = block.timestamp + 7 days;
        minVotes = minVotes_;  
    }
    
    modifier onlyGov() { require(msg.sender == gov, "msg.sender is not gov"); _; }
    
    function endNow() external onlyGov {
        endDate = block.timestamp;
    }
}