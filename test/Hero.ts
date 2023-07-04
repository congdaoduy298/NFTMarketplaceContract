import {ethers} from "hardhat"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers"
import {Contract} from "@ethersproject/contracts"
import {expect} from "chai"
import {keccak256} from "ethers/lib/utils"
import {BigNumber} from "ethers";
import * as helpers from "@nomicfoundation/hardhat-network-helpers";
const hre = require("hardhat");

describe('Hero', function () {
    let owner: SignerWithAddress,
        alice: SignerWithAddress,
        bob: SignerWithAddress,
        carol: SignerWithAddress,
        dev: SignerWithAddress;
    let nft: Contract;

    beforeEach(async ()=>{
        await ethers.provider.send("hardhat_reset", []);
        [owner, alice, bob, carol, dev] = await ethers.getSigners();

        const NFT = await ethers.getContractFactory("Hero", owner);
        nft = await NFT.deploy();
    })

    describe("mint", () => {
        it("should revert if caller is not a minter", async () => {
            const transaction = nft.connect(alice).mint(alice.address, 0);
            // const owner_transaction = await nft.mint(nft.owner(), 0);
            await expect(transaction).revertedWith("Caller is not a minter")
        })

        it("should create nft if requirements are met", async () => {
            const heroType = 0;
            let WITHDRAWER_ROLE = keccak256(Buffer.from("MINTER_ROLE")).toString();
            await nft.grantRole(WITHDRAWER_ROLE, alice.address)
            const user_transaction = await nft.connect(alice).mint(alice.address, heroType);
            const receipt = await user_transaction.wait();
            const args = receipt.events[1].args
            const tokenId = receipt.events[0].args.tokenId;

            expect(args.to).equal(alice.address)
            expect(args.hero_type).equal(heroType)
            expect(args.tokenId).equal(tokenId)         
            
            const owner_heroType = 999;
            const owner_address = await nft.owner()
            const owner_transaction = await nft.mint(owner_address, owner_heroType);
            const owner_receipt = await owner_transaction.wait();
            const owner_args = owner_receipt.events[1].args
            const owner_tokenId = owner_receipt.events[0].args.tokenId;

            expect(owner_args.to).equal(owner_address)
            expect(owner_args.hero_type).equal(owner_heroType)
            expect(owner_args.tokenId).equal(owner_tokenId)     
        })
    })

    describe("listTokenIds", () => {
        it("should return a list of token ids", async () => {
            const heroType = 1000;
            let WITHDRAWER_ROLE = keccak256(Buffer.from("MINTER_ROLE")).toString();
            await nft.grantRole(WITHDRAWER_ROLE, alice.address)
            await nft.connect(alice).mint(alice.address, heroType);
            
            const bob_heroType = 1001;
            await nft.grantRole(WITHDRAWER_ROLE, bob.address)
            await nft.connect(bob).mint(bob.address, bob_heroType);

            const hero2Type = 1002;
            await nft.connect(alice).mint(alice.address, hero2Type);

            const alice_listTokenIds = await nft.listTokenIds(alice.address)
            const bob_listTokenIds = await nft.listTokenIds(bob.address)
            const carol_listTokenIds = await nft.listTokenIds(carol.address)

            expect(alice_listTokenIds).to.deep.equal([BigNumber.from('1'), BigNumber.from('3')]);
            expect(bob_listTokenIds).to.deep.equal([BigNumber.from('2')])
            expect(carol_listTokenIds).to.deep.equal([])
        })
    })
})