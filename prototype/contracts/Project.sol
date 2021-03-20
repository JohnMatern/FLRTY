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
           string memory name,
           address creator,
           string memory shortDesc,
           uint256 minVotes) {
               
        gov = msg.sender;
        name = name;
        creator = creator;
        shortDesc = shortDesc;
        endDate = block.timestamp + 7 days;
        minVotes = minVotes;  
    }
}