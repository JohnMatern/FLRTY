// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;

contract Token {
    function mintInitSupply(address,uint256) external { }
    function fundProject(address, uint256) external {}
    function removeCommunityRestriction() external { }
    function setGov(address) external { }
    function balanceOf(address) public view returns(uint256) { }
    function mintToken(address, uint256) external { }
    function transferToken(address, address, uint256) external {}
    function burnToken(address, uint256) external { }
}


library erc20Lib {
    
    function setGov(address token, address newGov) public {
        Token(token).setGov(newGov);
    }
    
    //
    // initial supplies: currency + token
    //
    function sendInitialCurrencySupply(address token, address recipient, uint256 amount) public {
        Token(token).mintInitSupply(recipient, amount);
    }

    function transferToken(address token, address sender, address project, uint256 amount) public {
        Token(token).transferToken(sender, project, amount);
    }
    
    function sendVoteToken(address token, address recipient, uint256 amount) public {
        Token(token).mintToken(recipient, amount);
    }
    
    function endProject(address token, address sender, address currency, address project, uint256 minVotes, uint256 convert) public {
       uint256 voteCount = Token(token).balanceOf(project);
        Token(token).burnToken(project, voteCount);
        if (minVotes >= voteCount)
            Token(currency).fundProject(
                sender,
                voteCount*convert
            );
    }
    
    
}