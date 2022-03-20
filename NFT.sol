// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Provenance's Digital Marketplace", "TDM") {
        contractAddress = marketplaceAddress;

    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function getOwnerTokens() public view returns (uint[] memory) {
        uint count = _tokenIds.current();
        uint[] memory ownerTokens = new uint[](balanceOf(msg.sender));
        uint j = 0;
        for (uint i=1; i<=count; i++) {
            if (ownerOf(i) == msg.sender) {
                ownerTokens[j] = i;
                j = j+1;
            }
        }
        return ownerTokens;
    }
 }