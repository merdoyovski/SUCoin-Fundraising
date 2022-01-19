// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;
import "contracts/DutchAuction.sol";
import "contracts/CappedFCFSAuction.sol";
import "contracts/CappedAuctionWRedistribution.sol";
import "contracts/ProjectRegister.sol";
import "contracts/CappedParcelLimitFCFSAuction.sol";
import "contracts/UncappedAuction.sol";

contract TokenDistribution {
    mapping (bytes32 => Project) public projectTokens;

    address admin;

    ProjectRegister projectManager;

    struct Project{
        address proposer;
        address token;
        bool deployed;
    }

    constructor(address _projectManager){
        admin = msg.sender;
        projectManager = ProjectRegister(_projectManager); 
    }
    event TokenCreation(
        address indexed creator,
        string Name,
        string Symbol,
        address indexed token
    );

    event CreateAuctionEvent(
        address indexed creator,
        address auction,
        string auctionType
    );

    modifier tokenAssigned(bytes32 projectHash){
        require(projectTokens[projectHash].token != address(0),"No token assigned to this project");
        _;
    }

    modifier tokenOwner(bytes32 projectHash){
        require(projectTokens[projectHash].proposer == msg.sender ,"You are not the owner of the token");
        _;
    }

    modifier notDeployed(bytes32 projectHash){
        require(!projectTokens[projectHash].deployed,"Auction already deployed for this project.");
        _;
    }

    function assignToken(address tokenaddr, bytes32 projectHash) public {
        require(tokenaddr != address(0), "Empty parameter tokenaddr");
        require(projectTokens[projectHash].token == address(0),"Some token already assigned to this project");
        projectManager.isValidToDistribute(msg.sender, projectHash);
        projectTokens[projectHash].token = tokenaddr;
        projectTokens[projectHash].proposer = msg.sender;
        ERC20 token = ERC20(tokenaddr);
        emit TokenCreation(msg.sender, token.name(), token.symbol(),address(token));
    }

    function CreateDutchAuction(
            uint startingPrice,
            uint priceDeductionRate,
            bytes32 projectHash,
            uint numberOfTokensToBeDistributed,
            address sucoinaddress,
            uint minPrice) public tokenAssigned(projectHash) tokenOwner(projectHash) notDeployed(projectHash) returns(address){
                DutchAuction auction = new DutchAuction(startingPrice, priceDeductionRate, projectTokens[projectHash].token, numberOfTokensToBeDistributed, sucoinaddress, minPrice, msg.sender);
                emit CreateAuctionEvent(msg.sender, address(auction), "Dutch");
                return address(auction);
            }
    
    function CreateCappedAuction(
        uint price,
        bytes32 projectHash,
        address sucoin,
        uint numberoftokens
    )public tokenAssigned(projectHash) tokenOwner(projectHash) notDeployed(projectHash) returns(address){
        CappedFCFSAuction auction = new CappedFCFSAuction(msg.sender, price, projectTokens[projectHash].token, sucoin, numberoftokens);
        emit CreateAuctionEvent(msg.sender, address(auction), "CappedFCFSAuction");
        return address(auction);
    }

    function CreateCappedProportionalAuction(
        uint price,
        bytes32 projectHash,
        address sucoin,
        uint numberoftokens
    )public tokenAssigned(projectHash) tokenAssigned(projectHash) tokenOwner(projectHash) notDeployed(projectHash) returns(address){
        CappedAuctionWRedistribution auction = new CappedAuctionWRedistribution(msg.sender, price, projectTokens[projectHash].token, sucoin, numberoftokens);
        emit CreateAuctionEvent(msg.sender, address(auction), "CappedAuctionWRedistribution");
        return address(auction);
    }

    function CreateCappedParcelLimitAuction(
        uint price,
        bytes32 projectHash,
        address sucoin,
        uint numberoftokens,
        uint limit
    )public tokenAssigned(projectHash) tokenOwner(projectHash) notDeployed(projectHash) returns(address){
        CappedParcelLimitFCFSAuction auction = new CappedParcelLimitFCFSAuction(msg.sender, price, projectTokens[projectHash].token, sucoin, numberoftokens, limit);
        emit CreateAuctionEvent(msg.sender, address(auction), "CappedParcelLimitFCFSAuction");
        return address(auction);
    }

    function CreateUncappedAuction(
        uint price,
        bytes32 projectHash,
        address sucoin,
        uint ratio
    )public notDeployed(projectHash) returns(address){
        projectManager.isValidToDistribute(msg.sender, projectHash);
        UncappedAuction auction = new UncappedAuction(msg.sender, price, sucoin, ratio);
        emit CreateAuctionEvent(msg.sender, address(auction), "CreateUncappedAuction");
        //TokenMintable token = new TokenMintable(tokenName, symbol, address(auction));
        //emit TokenCreation(msg.sender, tokenName, symbol, address(token));
        return address(auction);
    }
   
}