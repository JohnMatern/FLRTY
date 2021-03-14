pragma solidity <= 0.8.0;
import "./lib/openzeppelin/token/ERC721/ERC721.sol";

contract GovToken is ERC721 {
    constructor(string memory name_, string memory symbol_) public ERC721(name_, symbol_) {
        
    }
}