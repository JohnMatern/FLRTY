// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "./lib/openzeppelin/token/ERC20/ERC20.sol";
import "./lib/EIP712MetaTransaction.sol";

contract VoteToken is ERC20, EIP712MetaTransaction {
    
    address public gov;
    
     constructor (string memory name_, string memory symbol_, address gov_) public EIP712MetaTransaction(name_, "1") ERC20(name_, symbol_) {
        _setupDecimals(0);
        gov = gov_;
    }
    
    modifier onlyGov() { require(_msgSender() == gov, "msg.sender is not gov"); _; }
    
    /**
     * msgSender() for EIP712MetaTransaction
     */
     
     function _msgSender() internal view override returns (address payable) {
         return payable(msgSender());
     }  
     
    function mintToken(address account, uint256 amount) external onlyGov {
         _mint(account, amount);
    }
    
}