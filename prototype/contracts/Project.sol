// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./GovAddressManager.sol";

contract Project {
   GovAddressManager public gov;
   string public name;
   address public creator;
   address public group;
   string public shortDesc;
   uint public endDate;
   uint256 public minVotes;
   
    constructor (
           address gov_,
           string memory name_,
           address creator_,
           string memory shortDesc_,
           uint256 minVotes_,
           address group_) {
               
        gov = GovAddressManager(gov_);
        name = name_;
        creator = creator_;
        shortDesc = shortDesc_;
        endDate = block.timestamp + 7 days;
        minVotes = minVotes_;  
        group = group_;
    }
    
    modifier onlyGov() { require(msg.sender == gov.gov(), "msg.sender is not gov"); _; }
    
    function endNow() external onlyGov {
        endDate = block.timestamp;
    }
    
    function setName(string memory newName) external onlyGov {
        name = newName;
    }
    
    function setDesc(string memory shortDesc) external onlyGov {
        shortDesc = shortDesc;
    }
}