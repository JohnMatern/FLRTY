// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;

import "./lib/EIP712MetaTransaction.sol";
import "./GovAddressManager.sol";
import "./CurrencyCoin.sol";
import "./GovStorage.sol";
import "./VoteToken.sol";
import "./Project.sol";
import "./Group.sol";

contract Gov is EIP712MetaTransaction {
    address public owner;
    uint256 public oneToken = 100;
    uint256 internal initSupply;
    uint256 internal voteTokenAmount;
    uint256 public conversionFactor;

    GovStorage public data;
    CurrencyCoin internal currency;
    VoteToken internal voteToken;
    GovAddressManager internal gmngr;

    constructor() EIP712MetaTransaction("Flarity Gov", "1") {}

    modifier onlyOwner() {
        require(owner == msgSender(), "msgSender() is not owner");
        _;
    }
    modifier onlyAdmin() {
        require(data.admins(msgSender()) == true, "msgSender() is not admin");
        _;
    }
    modifier onlyAccessHub() {
        require(
            data.accessHubs(msgSender()) == true,
            "msgSender() is not accessHub"
        );
        _;
    }
    modifier onlyUser() {
        require(
            data.userWhitelist(msgSender()) == true,
            "msgSender() is not User"
        );
        _;
    }
    modifier onlyAdminOrAccessHub() {
        require(
            data.admins(msgSender()) || data.accessHubs(msgSender()),
            "msgSender() is not admin or accessHub"
        );
        _;
    }
    
    
    //
    // administrative functions
    //
    function init(
        address data_,
        address _currency,
        address _voteToken,
        address _gmngr,
        uint256 conversionFactor_,
        uint256 initSupply_,
        uint256 voteTokenAmount_
    ) public onlyOwner {
        owner = msg.sender;

        data.addAdmin(msg.sender);
        data.addAccessHub(msg.sender);
        currency = CurrencyCoin(_currency);
        voteToken = VoteToken(_voteToken);
        gmngr = GovAddressManager(_gmngr);

        conversionFactor = conversionFactor_;
        initSupply = initSupply_;
        voteTokenAmount = voteTokenAmount_;
    }

    function setInitSupply(uint256 amount) public onlyAdmin {
        initSupply = amount;
    }

    function getInitSupply() public view onlyAdmin returns (uint256) {
        return initSupply;
    }

    function setVoteTokenAmount(uint256 amount) public onlyAdmin {
        voteTokenAmount = amount;
    }

    function getVoteTokenAmount() public view onlyAdmin returns (uint256) {
        return voteTokenAmount;
    }

    function setConversionFactor(uint256 factor) public onlyAdmin {
        conversionFactor = factor;
    }

    function getConversionFactor() public view onlyAdmin returns (uint256) {
        return conversionFactor;
    }

    function removeCommunityRestriction() public onlyOwner {
        currency.removeCommunityRestriction();
    }

    function setNewGov(address newGov) public onlyOwner {
        currency.setGov(newGov);
        voteToken.setGov(newGov);
        gmngr.setGov(newGov);
    }

    //
    // initial supplies: currency + token
    //
    function sendInitialCurrencySupply(address recipient) private {
        require(
            data.accessHubs(recipient) == true,
            "initial currency supply recipient is no accessHub"
        );
        currency.mintInitSupply(recipient, initSupply * oneToken);
    }

    function sendVoteToken(address recipient) private {
        require(
            data.userWhitelist(recipient) == true,
            "initial currency supply recipient is no accessHub"
        );
        voteToken.mintToken(recipient, voteTokenAmount);
    }

    //
    // whitelist functions
    //
    function addAdmin(address newAdmin) public onlyAdmin {
        data.addAdmin(newAdmin);
    }

    function removeAdmin(address oldAdmin) public onlyAdmin {
        data.removeAdmin(oldAdmin);
    }

    function isAdmin(address admin) public view returns (bool) {
        return data.admins(admin);
    }

    function addAccessHub(address accessHub) public onlyAdmin {
        data.addAccessHub(accessHub);
        sendInitialCurrencySupply(accessHub);
    }

    function removeAccessHub(address accessHub) public onlyAdmin {
        data.removeAccessHub(accessHub);
    }

    function isAccessHub(address accessHub) public view returns (bool) {
        return data.accessHubs(accessHub);
    }

    function addUsertoWhitelist(address user) private {
        data.addUsertoWhitelist(user);
        sendVoteToken(user);
    }

    function addUser(address user) public onlyAdminOrAccessHub {
        addUsertoWhitelist(user);
    }

    function addUserByCode(string memory code) public {
        require(
            data.inviteCodes(keccak256(abi.encodePacked(code))) == true,
            "invite code is invalid"
        );
        data.removeInviteCode(keccak256(abi.encodePacked(code)));
        addUsertoWhitelist(msgSender());
    }

    function removeUser(address user) public onlyAdminOrAccessHub {
        data.removeUser(user);
    }

    function isUser(address user) public view returns (bool) {
        return data.isUser(user);
    }

    function addInviteCode(bytes32 code) public onlyAdmin {
        data.addInviteCode(code);
    }

    function addMultipleCodes(bytes32[] memory codes) public onlyAdmin {
        data.addMultipleCodes(codes);
    }

    function removeInviteCode(bytes32 code) public onlyAdmin {
        data.removeInviteCode(code);
    }

    function isInvitecode(string memory code) public view returns (bool) {
        return data.inviteCodes(keccak256(abi.encodePacked(code)));
    }
    
    //
    // Project functions
    //
    function createProject(
        string memory name,
        string memory shortDesc,
        uint256 minVotes,
        address group
    ) public onlyUser {
        require(msgSender() == Group(group).creator(), "msg.sender is not creator of group");
        address newProject =
            address(new Project(gmngr.gov(), name, msgSender(), shortDesc, minVotes, group));
        data.addNewProject(newProject);
    }

    function getProjectList()
        public
        view
        onlyUser()
        returns (address[] memory)
    {
        return data.getProjectList();
    }

    function voteForProject(address project, uint256 amount) public onlyUser {
        require(
            voteToken.balanceOf(msgSender()) >= amount,
            "user amount of vote token to low"
        );
        require(
            (data.voteHistory(project, msgSender()) == 0 && amount == 1) ||
                (data.voteHistory(project, msgSender())**2 == amount),
            "wrong amount of voting token"
        );
        require(
            Project(project).endDate() <= block.timestamp,
            "project runtime expired "
        );
        voteToken.transferToken(msgSender(), project, amount);
        data.addVoteHistory(project, msgSender(), amount);
    }

    function endProject(address project) public onlyUser {
        require(
            Project(project).creator() == msgSender(),
            "msgSender() is not project creator"
        );
        require(
            Project(project).endDate() >= block.timestamp,
            "can't end project, because project is active"
        );
        data.freeSlot(project);
        uint256 voteCount = voteToken.balanceOf(project);
        voteToken.burnToken(project, voteCount);
        if (Project(project).minVotes() >= voteCount)
            currency.fundProject(
                msgSender(),
                voteCount * oneToken * conversionFactor
            );
    }
    
    function changeProjectDescription(address projectAddress, string memory newDesc) public onlyUser {
        Project project = Project(projectAddress);
        require(msgSender() == project.creator(), "msg.sender is not creator of project");
        project.setDesc(newDesc);
    }
    
    function changeProjectName(address projectAddress, string memory newName) public onlyUser {
        Project project = Project(projectAddress);
        require(msgSender() == project.creator(), "msg.sender is not creator of project");
        project.setName(newName);
    }

    function demoEndProject(address project) public onlyAdmin {
        Project(project).endNow();
    }

    function projectCanReceive(address project) external view returns (bool) {
        return (Project(project).endDate() >= block.timestamp);
    }

    function getProjectName(address project) public view onlyUser returns(string memory) {
        return Project(project).name();
    }
    
    function getProjectDesc(address project) public view onlyUser returns(string memory) {
        return Project(project).shortDesc();
    }
    
    function getProjectCreator(address project) public view onlyUser returns(address) {
        return Project(project).creator();
    }
    
    //
    // group functions
    //
    function createGroup(string memory name, string memory shortDesc) public onlyUser {
        address group = address(new Group(gmngr.gov(), msgSender(), name, shortDesc));
        data.newGroup(group, msgSender());
    }
    
    function addUserToGroup(address groupAddress, address user) public onlyUser {
        Group group = Group(groupAddress);
        require(msgSender() == group.creator(), "msg.sender is not creator of group");
        require(!group.isUser(user), "user already in group");
        group.addUser(user);
        data.addGroupToUser(groupAddress, user);
    }
    
    function addMultipleUsersToGroup(address groupAddress, address[] memory users) public onlyUser {
        Group group = Group(groupAddress);
        require(msgSender() == group.creator(), "msg.sender is not creator of group");
        for(uint i; i < users.length; i++) {
            if(!group.isUser(users[i])) {
                group.addUser(users[i]);
                data.addGroupToUser(groupAddress, users[i]);
            }
        }
    }
    
    function removeUserFromGroup(address user, address groupAddress) public onlyUser {
        Group group = Group(groupAddress);
        require(msgSender() == group.creator(), "msg.sender is not creator of group");
        require(group.isUser(user), "user is not in list");
        group.removeUser(user);
        data.removeGroupFromUser(groupAddress, user);
    }
    
    function removeGroup(address groupAddress) public onlyUser {
        Group group = Group(groupAddress);
        require(msgSender() == group.creator(), "msg.sender is not creator of group");
        group.clear();
    }
    
    function getGroups() public view onlyUser returns(address[] memory) {
        return data.getGroups();
    }
    
    function getUserGroups(address user) public view onlyUser returns(address[] memory) {
        return data.getUserGroups(user);
    }
    
    function newGroupCreator(address groupAddress, address newCreator) public onlyUser {
        Group group = Group(groupAddress);
        require(msgSender() == group.creator(), "msg.sender is not creator of group");
        group.setCreator(newCreator);
    }
    
    function changeGroupDescription(address groupAddress, string memory newDesc) public onlyUser {
        Group group = Group(groupAddress);
        require(msgSender() == group.creator(), "msg.sender is not creator of group");
        group.setDesc(newDesc);
    }
    
    function changeGroupName(address groupAddress, string memory newName) public onlyUser {
        Group group = Group(groupAddress);
        require(msgSender() == group.creator(), "msg.sender is not creator of group");
        group.setName(newName);
    }
    
    function getGroupName(address group) public view onlyUser returns(string memory) {
        return Group(group).name();
    }
    
    function getGroupDesc(address group) public view onlyUser returns(string memory) {
        return Group(group).shortDesc();
    }
    
    function getGroupUsers(address group) public view onlyUser returns(address[] memory) {
        return Group(group).getUserList();
    }
    
    function getGroupCreator(address group) public view onlyUser returns(address) {
        return Group(group).creator();
    }
    
    //
    // some user functions
    //

    function setName(string memory name) public onlyUser {
        data.setName(name, msgSender());
    }

    function resolveName(string memory name) public view returns (address) {
        return data.resolveName(name);
    }

    function resolveAddress(address addr) public view returns (string memory) {
        return data.resolveAddress(addr);
    }
    
    function addFriend(address newFriend) external onlyUser {
        data.addFriend(msgSender(), newFriend);
    }
    
    function removeFriend(address oldFriend) external onlyUser {
        data.removeFriend(msgSender(), oldFriend);
    }
    
    function getFriends(address user) external view onlyUser returns(address[] memory) {
        return data.getFriends(user);
    }

    function addPhoto(string memory photo) external onlyUser {
        data.addPhoto(msgSender(), photo);
    }
    
    function removePhoto() external onlyUser {
        data.removePhoto(msgSender());
    }
    
    function getPhoto(address user) external view onlyUser returns (string memory) {
        return data.getPhoto(user);
    }
}
