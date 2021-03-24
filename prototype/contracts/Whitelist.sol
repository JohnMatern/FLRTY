// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;
import "./lib/EIP712MetaTransaction.sol";

contract Functions {
    function mintInitToken(address, uint256) external {}
    function setWhitelist(address) external {}
    function removeCommunityRestriction() external {}
    function pushUser(address) public {}
}

contract Whitelist is EIP712MetaTransaction {

    address public owner;

    address public store;
    address public userData;
    address public manager;
    address public currency;
    address public vote;
    address public deployGroup;
    address public deployProject;

    uint256 public currencySupply;
    uint256 public voteSupply;

    mapping(address => bool) public admins; // admin list
    mapping(address => bool) public accessHubs; // accessHub list
    mapping(address => bool) public users; // user whitelist
    mapping(bytes32 => bool) public inviteCodes; // invite code list

    constructor() EIP712MetaTransaction("Flarity Whitelist", "1") {
        owner = msg.sender;
        admins[owner] = true;
        accessHubs[owner] = true;
        currencySupply = 10000; // 100,00 Currency
        voteSupply = 100;
    }

    modifier onlyOwner() {
        require(owner == msgSender(), "msgSender() is not owner");
        _;
    }
    modifier onlyAdmin() {
        require(admins[msgSender()] == true, "msgSender() is not admin");
        _;
    }
    modifier onlyAccessHub() {
        require(accessHubs[msgSender()] == true, "msgSender() is not accessHub");
        _;
    }
    modifier onlyUser() {
        require(users[msgSender()] == true, "msgSender() is not User");
        _;
    }
    modifier onlyAdminOrAccessHub() {
        require(admins[msgSender()] || accessHubs[msgSender()], "msgSender() is not admin or accessHub");
        _;
    }

    function addAdmin(address newAdmin) public onlyOwner {
        admins[newAdmin] = true;
    }
    function removeAdmin(address oldAdmin) public onlyOwner {
        delete admins[oldAdmin];
    }
    function isAdmin(address admin) public view returns(bool) {
        return admins[admin];
    }

    function addAccessHub(address newHub) public onlyAdmin {
        accessHubs[newHub] = true;
        Functions(currency).mintInitToken(newHub, currencySupply);
        if(!users[newHub]) {
            users[newHub] = true;
            Functions(vote).mintInitToken(newHub, voteSupply);
            Functions(store).pushUser(newHub);
        }
    }
    function removeAccessHub(address oldHub) public onlyAdmin {
        delete accessHubs[oldHub];
    }
    function isAccessHub(address accessHub) public view returns(bool) {
        return accessHubs[accessHub];
    }

    function addUser(address newUser) public onlyAdminOrAccessHub {
        users[newUser] = true;
        Functions(vote).mintInitToken(newUser, voteSupply);
        Functions(store).pushUser(newUser);
    }
    function removeUser(address oldUser) public onlyAdminOrAccessHub {
        delete users[oldUser];
    }
    function isUser(address user) public view returns(bool) {
        return users[user];
    }

    function addInviteCode(bytes32 code) public onlyAdmin {
        inviteCodes[code] = true;
    }
    function removeInviteCode(bytes32 code) public onlyAdmin {
        delete inviteCodes[code];
    }
    function addMultipleInviteCodes(bytes32[] memory codes) public onlyAdmin {
        for(uint8 i=0; i<codes.length; i++) {
            inviteCodes[codes[i]] = true;
        }
    }
    function addUserByCode(string memory code) public {
        require(inviteCodes[keccak256(abi.encodePacked(code))] == true, "invite code is invalid");
        delete inviteCodes[keccak256(abi.encodePacked(code))];
        users[msgSender()] = true;
        Functions(vote).mintInitToken(msgSender(), voteSupply);
        Functions(store).pushUser(msgSender());
    }
    function isInviteCode(string memory code) public view returns(bool) {
        return inviteCodes[keccak256(abi.encodePacked(code))];
    }

    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    function isOwner(address ownerAddress) public view returns(bool) {
        return (owner == ownerAddress);
    }

    function setStore(address newStore) public onlyOwner {
        store = newStore;
    }
    function isStore(address storeAddress) public view returns(bool) {
        return (store == storeAddress);
    }
    function getStore() public view returns(address) {
        return store;
    }

    function setUserData(address newUserData) public onlyOwner {
        userData = newUserData;
    }
    function isUserData(address userDataAddress) public view returns(bool) {
        return (userData == userDataAddress);
    }
    function getUserData() public view returns(address) {
        return userData;
    }

    function setManager(address newManager) public onlyOwner {
        manager = newManager;
    }
    function isManager(address managerAddress) public view returns(bool) {
        return (manager == managerAddress);
    }
    function getManager() public view returns(address) {
        return manager;
    }

    function setCurrencySupply(uint256 supply) public onlyAdmin {
        currencySupply = supply*100;
    }
    function getCurrencySupply() public view returns(uint256) {
        return currencySupply;
    }

    function setVoteSupply(uint256 supply) public onlyAdmin {
        voteSupply = supply;
    }
    function getVoteSupply() public view returns(uint256) {
        return voteSupply;
    }

    function getCurrency() public view returns(address) {
        return currency;
    }
    function getVote() public view returns(address) {
        return vote;
    }
    function setDeployGroup(address newDGroup) public onlyOwner {
        deployGroup = newDGroup;
    }
    function getDeployGroup() public view returns(address) {
        return deployGroup;
    }
    function setDeployProject(address newDProject) public onlyOwner {
        deployProject = newDProject;
    }
    function getDeployProject() public view returns(address) {
        return deployProject;
    }

    function initAddresses(address newStore, address newUserData, address newManager, address newCurrency, address newVote, address newDeployGroup, address newDeployProject) public onlyOwner {
        store = newStore;
        userData = newUserData;
        manager = newManager;
        currency = newCurrency;
        vote = newVote;
        deployGroup = newDeployGroup;
        deployProject = newDeployProject;
    }

    function setNewWhitelist(address newWhitelist) public onlyOwner {
        Functions(store).setWhitelist(newWhitelist);
        Functions(userData).setWhitelist(newWhitelist);
        Functions(manager).setWhitelist(newWhitelist);
        Functions(currency).setWhitelist(newWhitelist);
        Functions(vote).setWhitelist(newWhitelist);
        Functions(deployGroup).setWhitelist(newWhitelist);
        Functions(deployProject).setWhitelist(newWhitelist);
    }

    function removeCurrencyCommunityRestriction() public onlyOwner {
        Functions(currency).removeCommunityRestriction();
    }
    function removeVoteCommunityRestriction() public onlyOwner {
        Functions(vote).removeCommunityRestriction();
    }
}