// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;

contract GovAddressManager {
    address public gov;
    
    constructor() { }
    
    
    modifier onlyGov() {
        require(msg.sender == gov, "msg.sender is not gov");
        _;
    }

    function init(address gov_) public {
        require(gov == address(0));
        gov = gov_;
    }
    
    function setGov(address newGov) external onlyGov {
        gov = newGov;
    }
}