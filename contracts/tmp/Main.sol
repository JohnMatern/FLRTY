pragma solidity <0.8.0;

import "../openzeppelin/utils/Context.sol";
import "./inh.sol";

contract Main is Inh, Context {
  address public owner;
  constructor() {
    owner = msg.sender;
  }

  function transfer() public virtual override returns (address payable){
      return _msgSender();
  }
}
