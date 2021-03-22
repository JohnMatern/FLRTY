// SPDX-License-Identifier: MIT
pragma solidity <=0.8.0;

import "./CurrencyCoin.sol";
import "./VoteToken.sol";
import "./Project.sol";
import "./lib/EIP712MetaTransaction.sol";
import "./GovStorage.sol";

contract Gov_v2 is EIP712MetaTransaction {
    address public owner;
    uint256 public oneToken = 100;
    uint256 internal initSupply;
    uint256 internal voteTokenAmount;
    uint256 public conversionFactor;

    GovStorage public data;
    CurrencyCoin internal currency;
    VoteToken internal voteToken;

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
        uint256 conversionFactor_,
        uint256 initSupply_,
        uint256 voteTokenAmount_
    ) public onlyOwner {
        owner = msg.sender;

        data.addAdmin(msg.sender);
        data.addAccessHub(msg.sender);
        currency = CurrencyCoin(_currency);
        voteToken = VoteToken(_voteToken);

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
        data.setGov(newGov);
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

    function setName(string memory name) public onlyUser {
        data.setName(name, msgSender());
    }

    function resolveName(string memory name) public view returns (address) {
        return data.resolveName(name);
    }

    function resolveAddress(address addr) public view returns (string memory) {
        return data.resolveAddress(addr);
    }

    //
    // Project functions
    //
    function createProject(
        string memory name,
        string memory shortDesc,
        uint256 minVotes
    ) public onlyUser {
        address newProject =
            address(new Project(name, msgSender(), shortDesc, minVotes));
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

    function demoEndProject(address project) public onlyAdmin {
        Project(project).endNow();
    }

    function projectCanReceive(address project) external view returns (bool) {
        return (Project(project).endDate() >= block.timestamp);
    }
}
