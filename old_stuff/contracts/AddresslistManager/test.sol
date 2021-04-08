pragma solidity <0.8.0;

import "./AddresslistManager.sol";



contract Test is AddresslistManager {
    address public sc;
    AddresslistManager public al;
    bool public boo;
    constructor(address a) {
        sc = a;
        al = AddresslistManager(0xd9145CCE52D386f254917e481eB44e9943F39138);
    }
    
    
    function checkBoo(string memory name, address addr) public {
        boo = al.checkEntry(name, addr);
    }
}