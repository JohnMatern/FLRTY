pragma solidity ^0.7.0;

import "./EIP712Base.sol";


contract Mtxverifier is EIP712Base {
    bytes32 private constant META_TRANSACTION_TYPEHASH = keccak256(
    bytes(
            "MetaTransaction(uint256 nonce,address from,bytes functionSignature)"
        )
    );
    
    address public isSignedBy;
    address public shouldSignedBy;
    bytes32 public r;
    bytes32 public s;
    uint8 public v;
    
    constructor (string memory name, string memory version, uint256 chainid) public EIP712Base(name, version, chainid) {}
    
    struct MetaTransaction {
        uint256 nonce;
        address from;
        bytes functionSignature;
    }
    
    MetaTransaction public mtx;
    
    function verify(
        address signer,
        //MetaTransactionX memory metaTx,
        uint256 nonce,
        address userAddress,
        bytes memory functionSignature,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) public {
        MetaTransaction memory metaTx = MetaTransaction({
            nonce: nonce,
            from: userAddress,
            functionSignature: functionSignature
        });
        
        shouldSignedBy = signer;
        mtx = metaTx;
        r = sigR;
        s = sigS;
        v = sigV;
        address rec = ecrecover(toTypedMessageHash(hashMetaTransaction(metaTx)), sigV, sigR, sigS);
        isSignedBy = rec;

    }
    
    
        function hashMetaTransaction(MetaTransaction memory metaTx)
        internal
        view
        returns (bytes32)
    {
        return
            keccak256(
                abi.encode(
                    META_TRANSACTION_TYPEHASH,
                    metaTx.nonce,
                    metaTx.from,
                    keccak256(metaTx.functionSignature)
                )
            );
    }
    
    
}