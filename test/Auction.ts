import {ethers} from "hardhat"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers"
import {Contract} from "@ethersproject/contracts"
import {expect} from "chai"
import {keccak256} from "ethers/lib/utils"
import {BigNumber} from "ethers";
import * as helpers from "@nomicfoundation/hardhat-network-helpers";


describe("Auction", function () {
    let owner: SignerWithAddress,
        alice: SignerWithAddress,
        bob: SignerWithAddress,
        carol: SignerWithAddress,
        dev: SignerWithAddress;
    let token: Contract;
    let nft: Contract;
    let auction: Contract;

    beforeEach(async () => {
        await ethers.provider.send("hardhat_reset", []);
        [owner, alice, bob, carol, dev] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Floppy", owner);
        token = await Token.deploy();
        const NFT = await ethers.getContractFactory("Hero", owner);
        nft = await NFT.deploy();
        const Auction = await ethers.getContractFactory("Auction", owner);
        auction = await Auction.deploy(token.address, nft.address);
    })

    function parseEther(amount: Number) {
        return ethers.utils.parseUnits(amount.toString(), 18)
    }

    const mintAndCreateAuction = async (signer: SignerWithAddress, tokenId: number, bid: BigNumber, start: number, end: number) => {
        const heroType = 1;
        let WITHDRAWER_ROLE = keccak256(Buffer.from("MINTER_ROLE")).toString();
        await nft.grantRole(WITHDRAWER_ROLE, signer.address)
        await nft.connect(signer).mint(signer.address, heroType);

        const blockNumBefore = await ethers.provider.getBlockNumber();
        const blockBefore = await ethers.provider.getBlock(blockNumBefore);
        const timestampBefore = blockBefore.timestamp;
        

        await nft.connect(signer).approve(auction.address, tokenId);
        const transaction = await auction.connect(signer).createAuction(tokenId, bid, timestampBefore + start, timestampBefore + end);
    }


    describe("setTax", () => {
        it("should revert if sender is not owner", async () => {
            const tax = 2; 
            const tx = auction.connect(alice).setTax(tax);
            await expect(tx).revertedWith("Ownable: caller is not the owner");
        })
        it("should set tax", async () => {
            const tax = 2; 
            const tx = await auction.setTax(tax);
            const txHash = await tx.wait();
            expect(txHash.events[0].args.tax).equal(tax);
        })
    })

    describe("setToken", () => {
        it("should revert if sender is not owner", async () => {
            const tx = auction.connect(alice).setToken(alice.address);
            await expect(tx).revertedWith("Ownable: caller is not the owner");
        })
        it("should set token", async () => {
            const tokenAddress = alice.address; 
            const tx = await auction.setToken(tokenAddress);
            const txHash = await tx.wait();
            expect(txHash.events[0].args._token).equal(tokenAddress);
        })
    })

    describe("setNFT", () => {
        it("should revert if sender is not owner", async () => {
            const tx = auction.connect(alice).setNFT(alice.address);
            await expect(tx).revertedWith("Ownable: caller is not the owner");
        })
        it("should set nft", async () => {
            const nftAddress = alice.address; 
            const tx = await auction.setNFT(nftAddress);
            const txHash = await tx.wait();
            expect(txHash.events[0].args._nft).equal(nftAddress);
        })
    })

    describe("withdrawToken", () => {
        it("should revert if sender is not owner", async () => {
            const initialPrice = parseEther(1);
            const tx = auction.connect(alice).withdrawToken(initialPrice);
            await expect(tx).revertedWith("Ownable: caller is not the owner");
        })
        it("should revert if insufficient account balance", async () => {
            const initialPrice = parseEther(1);
            // await token.transfer(auction.address, parseEther(10000))
            const tx = auction.withdrawToken(initialPrice);
            await expect(tx).revertedWith("Insufficient account balance");
        })
        it("should transfer token if all requirements are met", async () => {
            const initialPrice = parseEther(1);
            await token.transfer(auction.address, parseEther(10000))
            const ownerBalance = await token.balanceOf(owner.address);
            const auctionBalance = await token.balanceOf(auction.address);
            await auction.withdrawToken(initialPrice);
            const newOwnerBalance = await token.balanceOf(owner.address);
            const newAuctionBalance = await token.balanceOf(auction.address);
            expect(newOwnerBalance.sub(ownerBalance)).equal(auctionBalance.sub(newAuctionBalance));
            expect(newOwnerBalance.sub(ownerBalance)).equal(initialPrice);
        })
    })

    describe("withdrawERC20", () => {
        it("should revert if sender is not owner", async () => {
            const tx = auction.connect(alice).withdrawERC20();
            await expect(tx).revertedWith("Ownable: caller is not the owner");
        })
        it("should transfer token if all requirements are met", async () => {
            await token.transfer(auction.address, parseEther(10000))
            const ownerBalance = await token.balanceOf(owner.address);
            const auctionBalance = await token.balanceOf(auction.address);
            await auction.withdrawERC20();
            const newOwnerBalance = await token.balanceOf(owner.address);
            const newAuctionBalance = await token.balanceOf(auction.address);
            expect(newOwnerBalance.sub(ownerBalance)).equal(auctionBalance.sub(newAuctionBalance));
            expect(newOwnerBalance.sub(ownerBalance)).equal(auctionBalance);
        })
    })

    describe("createAuction", () => {
        it("should revert if the auction has not been stated", async () => {
            const transaction = auction.createAuction(1, 1, 0, 1);
            await expect(transaction).revertedWith("Auction can not start");
        })
        it("should revert if the auction ends before it starts", async () => {
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
            const transaction = auction.createAuction(1, 1, timestampBefore + 2, 1);
            await expect(transaction).revertedWith("Auction can not end before it starts");
        })
        it("should revert if initial price is zero", async () => {
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
            const transaction = auction.createAuction(1, 0, timestampBefore + 2, timestampBefore + 4);
            await expect(transaction).revertedWith("Initial price must be greater than 0");
        })
        it("should revert if sender is not the owner of the nft", async () => {
            const heroType = 1;
            await nft.mint(owner.address, heroType);

            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
            const transaction = auction.connect(alice).createAuction(1, 1, timestampBefore + 2, timestampBefore + 4);
            await expect(transaction).revertedWith("Must be the owner to create auction");
        })
        it("should revert if the contract has not been approved the token", async () => {
            const heroType = 1;
            await nft.mint(owner.address, heroType);

            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
            const transaction = auction.createAuction(1, 1, timestampBefore + 2, timestampBefore + 4);
            await expect(transaction).revertedWith("Contract must be approved to transfer the token");
        })
        it("should transfer token if all requirements are met", async () => {
            const heroType = 1;
            const tokenId = 1;
            let WITHDRAWER_ROLE = keccak256(Buffer.from("MINTER_ROLE")).toString();
            await nft.grantRole(WITHDRAWER_ROLE, alice.address)
            await nft.connect(alice).mint(alice.address, heroType);

            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
            

            await nft.connect(alice).approve(auction.address, tokenId);
            const transaction = await auction.connect(alice).createAuction(tokenId, 1, timestampBefore + 2, timestampBefore + 4);
            const receipt = await transaction.wait();
            const _auction = await auction.getAuction(0);
            const currentOwner = await nft.ownerOf(tokenId);
            expect(_auction.auctioneer).equal(alice.address);
            expect(_auction._tokenId).equal(tokenId);
            expect(_auction.initialPrice).equal(1);
            expect(_auction.lastBid).equal(1);
            expect(_auction.lastBidder).equal(ethers.constants.AddressZero);
            expect(_auction.startTime).equal(timestampBefore+2);
            expect(_auction.endTime).equal(timestampBefore+4);
            expect(_auction.completed).equal(false);
            expect(currentOwner).equal(auction.address);
        })
    })


    describe("finishAuction", () => {
        it("should revert if caller is not owner of contract or owner of NFT", async () => {
            const initialPrice = parseEther(1);
            const tokenId = 1;
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000);
            const transaction = auction.connect(bob).finishAuction(0);
            await expect(transaction).revertedWith("Only auctioneer or owner can perform this action")
        })
        it("should revert if auction is already completed", async () => {
            const initialPrice = parseEther(1);
            const tokenId = 1;
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000);
            const transaction = await auction.connect(alice).finishAuction(0);
            const oneMoreTime = auction.connect(alice).finishAuction(0);

            await expect(oneMoreTime).revertedWith("Auction is already completed")
        })
        it("should send back token to auctioneer if no one bid", async () => {
            const initialPrice = parseEther(1);
            const tokenId = 1;
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000);
            const transaction = await auction.connect(alice).finishAuction(0);
            const currentOwner = await nft.ownerOf(tokenId);
            expect(currentOwner).equal(alice.address);
        })
        it("should send NFT to bidder and token to auctioneer if someone bid", async () => {
            const tokenId = 1;
            const initialPrice = parseEther(1);
            const lastBid = parseEther(100);
            
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000);
            
            await token.transfer(carol.address, parseEther(10000))
            await token.connect(carol).approve(auction.address, lastBid)
            await auction.connect(carol).joinAuction(0, lastBid);

            const oldBiggestBidderBalance = await token.balanceOf(carol.address);
            const oldAuctioneerBalance = await token.balanceOf(alice.address);
            const oldContractBalance = await token.balanceOf(auction.address);

            const transaction = await auction.connect(alice).finishAuction(0);
            const currentOwner = await nft.ownerOf(tokenId);
            // 1. The highest bidder receive then NFT
            expect(currentOwner).equal(carol.address);

            const newBiggestBidderBalance = await token.balanceOf(carol.address);
            const newAuctioneerBalance = await token.balanceOf(alice.address);
            const newContractBalance = await token.balanceOf(auction.address);

            const feeRate = await auction.AUCTION_SERVICE_FEE_RATE();
            const auctionServiceFee = (lastBid.sub(initialPrice)).mul(feeRate).div(100);
            const auctioneerReceive = lastBid.sub(auctionServiceFee);

            // 2. Contract hold fee, sent the remaining amount to auctioneer and _auction.completed is true.
            expect(newAuctioneerBalance.sub(oldAuctioneerBalance)).equal(auctioneerReceive)
            expect(newContractBalance).equal(auctionServiceFee)
            const _auction = await auction.getAuction(0);
            expect(_auction.completed).equal(true); 
        })
    })


    describe("joinAuction", () => {
        it("should revert if the auction has not been started", async () => {
            const tokenId = 1;
            const initialPrice = parseEther(1);
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2000, 4000)

            const transaction = auction.joinAuction(0, initialPrice);
            await expect(transaction).revertedWith("Auction has not started yet");
        })
        it("should revert if the auction is already completed", async () => {
            const tokenId = 1;
            const initialPrice = parseEther(1);
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000)
            await auction.connect(alice).finishAuction(0);
            const transaction = auction.joinAuction(0, initialPrice);
            await expect(transaction).revertedWith("Auction is already completed");
        })
        it("should revert if bid price is smaller than minimum bid price", async () => {
            const tokenId = 1;
            const initialPrice = parseEther(1);
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000)
            const transaction = auction.joinAuction(0, 0);
            await expect(transaction).revertedWith("Bid price is smaller than minimum bid price");
        })
        it("should revert if bidder balance is insufficient", async () => {
            const tokenId = 1;
            const initialPrice = parseEther(1);
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000)
            const transaction = auction.connect(bob).joinAuction(0, initialPrice);
            await expect(transaction).revertedWith("Insufficient balance");
        })
        it("should revert if auction contract address does not have enough insufficient allowance", async () => {
            const tokenId = 1;
            const initialPrice = parseEther(1);
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000)
            const transaction = auction.joinAuction(0, initialPrice);
            await expect(transaction).revertedWith("Insufficient allowance");
        })
        it("should revert if bidder is owner of the nft", async () => {
            const tokenId = 1;
            const initialPrice = parseEther(1);
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000)
            await token.transfer(alice.address, parseEther(10000))
            await token.connect(alice).approve(auction.address, initialPrice)
            const transaction = auction.connect(alice).joinAuction(0, initialPrice);
            await expect(transaction).revertedWith("Can not bid on your own auction");
        })
        it("should transfer token from bidder to auction contract and transfer token to previous bidder if all requirements are met", async () => {
            const tokenId = 1;
            const oldPrice = parseEther(1);
            const newPrice = parseEther(20);
            const initialPrice = parseEther(1);

            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000)
            await token.transfer(bob.address, parseEther(10000))
            await token.connect(bob).approve(auction.address, newPrice)

            await token.transfer(carol.address, parseEther(10000))
            await token.connect(carol).approve(auction.address, oldPrice)
            await auction.connect(carol).joinAuction(0, oldPrice);

            const oldBiggestBidderBalance = await token.balanceOf(bob.address);
            const oldPreviousBidderBalance = await token.balanceOf(carol.address);
            const oldContractBalance = await token.balanceOf(auction.address);

            await auction.connect(bob).joinAuction(0, newPrice);
            const _auction = await auction.getAuction(0);

            expect(_auction.lastBidder).equal(bob.address);
            expect(_auction.lastBid).equal(newPrice);


            const newBiggestBidderBalance = await token.balanceOf(bob.address);
            const newPreviousBidderBalance = await token.balanceOf(carol.address);
            const newContractBalance = await token.balanceOf(auction.address);
            
            expect(oldBiggestBidderBalance.sub(newBiggestBidderBalance)).equal(newPrice);
            expect(newContractBalance).equal(newPrice);
            expect(newPreviousBidderBalance.sub(oldPreviousBidderBalance)).equal(oldPrice);

        })
    })


    describe("cancelAuction", () => {
        it("should revert if caller is not owner of contract or owner of NFT", async () => {
            const initialPrice = parseEther(1);
            const tokenId = 1;
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000);
            const transaction = auction.connect(bob).cancelAuction(0);
            await expect(transaction).revertedWith("Only auctioneer or owner can perform this action")
        })
        it("should revert if auction is already completed", async () => {
            const initialPrice = parseEther(1);
            const tokenId = 1;
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000);
            const finishAuction = await auction.connect(alice).finishAuction(0);
            const cancelAuction = auction.connect(alice).cancelAuction(0);
            await expect(cancelAuction).revertedWith("Auction is already completed")
        })
        it("should cancel if all requirements are met and no one bid", async () => {
            const initialPrice = parseEther(1);
            const tokenId = 1;
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000);
            const cancelAuction = await auction.connect(alice).cancelAuction(0);
            // nft must send back to the auctioneer
            const currentOwner = await nft.ownerOf(tokenId);
            expect(currentOwner).equal(alice.address);
            // _auction.completed must be equal true
            const _auction = await auction.getAuction(0);
            expect(_auction.completed).equal(true); 
        })
        it("should cancel if all requirements are met and someone bid", async () => {
            const initialPrice = parseEther(1);
            const tokenId = 1;
            const lastBid = parseEther(100);
            await token.transfer(carol.address, parseEther(10000))
            await mintAndCreateAuction(alice, tokenId, initialPrice, 2, 4000);
            await token.connect(carol).approve(auction.address, lastBid)
            await auction.connect(carol).joinAuction(0, lastBid);
            const bidderBalance = await token.balanceOf(carol.address);  
            const cancelAuction = await auction.connect(alice).cancelAuction(0);
            const newBidderBalance = await token.balanceOf(carol.address);

            // send back token to bidder
            expect(newBidderBalance.sub(bidderBalance)).equal(lastBid);
            // nft must send back to the auctioneer
            const currentOwner = await nft.ownerOf(tokenId);
            expect(currentOwner).equal(alice.address);
            // _auction.completed must be equal true
            const _auction = await auction.getAuction(0);
            expect(_auction.completed).equal(true); 
        })
    })

    
    describe("getAuctionByStatus", () => {
        it("should return list auctions", async () => {
            const initialPrice = parseEther(1);
            await mintAndCreateAuction(alice, 1, initialPrice, 2, 4000);
            await mintAndCreateAuction(bob, 2, initialPrice, 2, 4000);
            await auction.connect(bob).finishAuction(1);
            await mintAndCreateAuction(carol, 3, initialPrice, 2, 4000);
            await mintAndCreateAuction(bob, 4, initialPrice, 2, 4000);
            await auction.connect(bob).finishAuction(3);

            const activeAuctions = await auction.getAuctionByStatus(true);
            for (let i = 0; i < activeAuctions.length; i++) {
                expect(activeAuctions[i].completed).equal(false);
            }

            const completedAuctions = await auction.getAuctionByStatus(false);
            for (let i = 0; i < completedAuctions.length; i++) {
                expect(completedAuctions[i].completed).equal(true);
            }
        })
    })
})