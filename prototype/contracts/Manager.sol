// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./lib/EIP712MetaTransaction.sol";

contract FunctionsM {
    // whitelist Functions
    function isUser(address) public view returns (bool) {}
    function isOwner(address) public view returns (bool) {}
    function isAdmin(address) public view returns (bool) {}
    function getStore() public view returns(address) {}
    function getVote() public view returns(address) {}
    function getCurrency() public view returns(address) {}
    function getVoteSupply() public view returns(uint256) {}
    function getDeployGroup() public view returns(address) {}
    function getDeployProject() public view returns(address) {}

    // Group Functions
    function isCreator(address) public view returns(bool) {}

    // Store Functions
    function addNewProject(address) public {}
    function getVoteHistory(address, address) public view returns(uint256) {}
    function addVoteHistory(address, address, uint256) public {}
    function newGroup(address, address) public {}
    function addGroupToUser(address, address) public {}
    function removeGroupFromUser(address, address) public {}
    function allowAllUserMintVoteInitSupply() public {}
    function removeCanMint(address) public {}
    function canMint(address) public view returns(bool) {}
    function freeSlot(address) public {}

    // Token Functions
    function balanceOf(address) public view returns(uint256) {}
    function transferToken(address, address, uint256) external {}
    function burnToken(address, uint256) external {}
    function mintToken(address,uint256) external {}
    
    // Deploy Project
    function createProject(string memory, address, string memory, uint256, address) public returns(address) {}
    
    // Deploy Group
    function createGroup(address, string memory, string memory) public returns(address) {}
    
    // Project
    function getEndDate() public view returns(uint256) {}
    function getCreator() public view returns(address) {}
    function getMinVotes() public view returns(uint256) {}
    
    // Group
    function addUser(address) external {}
    function removeUser(address) external {}
    function getUserList() public view returns(address[] memory) {}
}

contract Manager is EIP712MetaTransaction {
    address whitelist;
    uint256 conversationFactor;

    constructor(address whitelistAddress, uint256 newConversationFactor) EIP712MetaTransaction("Flarity Manager", "1") {
        whitelist = whitelistAddress;
        conversationFactor = newConversationFactor;
    }

    function store() internal view returns(address) {
        return FunctionsM(whitelist).getStore();
    }
    function vote() internal view returns(address) {
        return FunctionsM(whitelist).getVote();
    }
    function currency() internal view returns(address) {
        return FunctionsM(whitelist).getCurrency();
    }
    function newProject() internal view returns(address) {
        return FunctionsM(whitelist).getDeployProject();
    }
    function newGroup() internal view returns(address) {
        return FunctionsM(whitelist).getDeployGroup();
    }
    
    function setConversationFactor(uint256 newConversationFactor) public {
        require(FunctionsM(whitelist).isAdmin(msgSender()));
        conversationFactor = newConversationFactor;
    }

    function allowAllUserMintVoteInitSupply() public {
        require(FunctionsM(whitelist).isAdmin(msgSender()));
        FunctionsM(store()).allowAllUserMintVoteInitSupply();
    }

    function mintVoteInitSupply() public {
        uint256 voteAmount = FunctionsM(vote()).balanceOf(msgSender());
        uint256 initSupply = FunctionsM(whitelist).getVoteSupply();
        require((FunctionsM(whitelist).isUser(msgSender())) && (FunctionsM(store()).canMint(msgSender())) && (initSupply-voteAmount > 0));
        FunctionsM(store()).removeCanMint(msgSender());
        FunctionsM(vote()).mintToken(msgSender(), initSupply-voteAmount);
    }

    function createProject(string memory name, string memory shortDesc, uint256 minVotes, address group) public {
        require((FunctionsM(whitelist).isUser(msgSender())) && (FunctionsM(group).isCreator(msgSender())), "errorr");
        FunctionsM(store()).addNewProject(
            FunctionsM(newProject()).createProject(name, msgSender(), shortDesc, minVotes, group)
        );
    }
    function voteForProject(address project, uint256 amount) public {
        require((FunctionsM(whitelist).isUser(msgSender())) && 
        (FunctionsM(vote()).balanceOf(msgSender()) >= amount) && 
        (FunctionsM(project).getEndDate() >= block.timestamp) && (
            (FunctionsM(store()).getVoteHistory(project, msgSender()) == 0 && amount == 1) || 
            (FunctionsM(store()).getVoteHistory(project, msgSender())**2 == amount)
        ));
        FunctionsM(vote()).transferToken(msgSender(), project, amount);
        FunctionsM(store()).addVoteHistory(project, msgSender(), amount);
    }

    function endProject(address project) public {
        require((FunctionsM(whitelist).isUser(msgSender())) && (FunctionsM(project).getCreator() == msgSender()) && (FunctionsM(project).getEndDate() <= block.timestamp));
        FunctionsM(store()).freeSlot(project);
        uint256 voteCount = FunctionsM(vote()).balanceOf(project);
        FunctionsM(vote()).burnToken(project, voteCount);
        if (FunctionsM(project).getMinVotes() <= voteCount)
            FunctionsM(currency()).mintToken(msgSender(),voteCount*conversationFactor*100);
    }

    //
    // group FunctionsM
    //
    function createGroup(string memory name, string memory shortDesc) public {
        require(FunctionsM(whitelist).isUser(msgSender()));
        FunctionsM(store()).newGroup(
            FunctionsM(newGroup()).createGroup(msgSender(), name, shortDesc), 
            msgSender()
        );
    }
    
    function addUserToGroup(address groupAddress, address user) public {
        require((FunctionsM(whitelist).isUser(msgSender())) && (!FunctionsM(groupAddress).isUser(user)) && (msgSender() == FunctionsM(groupAddress).getCreator()));
        FunctionsM(groupAddress).addUser(user);
        FunctionsM(store()).addGroupToUser(groupAddress, user);
    }
    
    function addMultipleUsersToGroup(address groupAddress, address[] memory users) public {
        require((FunctionsM(whitelist).isUser(msgSender())) && (msgSender() == FunctionsM(groupAddress).getCreator()));
        for(uint i; i < users.length; i++) {
            if(!FunctionsM(groupAddress).isUser(users[i])) {
                FunctionsM(groupAddress).addUser(users[i]);
                FunctionsM(store()).addGroupToUser(groupAddress, users[i]);
            }
        }
    }
    function removeUserFromGroup(address user, address groupAddress) public {
        require((FunctionsM(whitelist).isUser(msgSender())) && (!FunctionsM(groupAddress).isUser(user)) && ((msgSender() == FunctionsM(groupAddress).getCreator()) || (FunctionsM(groupAddress).isUser(msgSender()))));
        FunctionsM(groupAddress).removeUser(user);
        FunctionsM(store()).removeGroupFromUser(groupAddress, user);
    }
    
    function removeGroup(address groupAddress) public {
        require((FunctionsM(whitelist).isUser(msgSender())) && (msgSender() == FunctionsM(groupAddress).getCreator()));
        address[] memory users = FunctionsM(groupAddress).getUserList();
        for(uint256 i = 0; i < users.length; i++) {
            FunctionsM(store()).removeGroupFromUser(groupAddress, users[i]);
        }
        //group.clear();
    }

    function setWhitelist(address newWhitelist) public {
        require(msgSender() == whitelist || FunctionsM(whitelist).isOwner(msgSender()));
        whitelist = newWhitelist;
    }
}
