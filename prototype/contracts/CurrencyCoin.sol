// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "./lib/openzeppelin/token/ERC20/ERC20.sol";
import "./lib/EIP712MetaTransaction.sol";

contract CurrencyCoin is ERC20, EIP712MetaTransaction {
    
     constructor (string memory name_, string memory symbol_) public EIP712MetaTransaction(name_, "1") ERC20(name_, symbol_) {
        _setupDecimals(2);
    }
    
    /**
     * msgSender() for EIP712MetaTransaction
     */
     
     function _msgSender() internal view override returns (address payable) {
         return payable(msgSender());
     }  
}