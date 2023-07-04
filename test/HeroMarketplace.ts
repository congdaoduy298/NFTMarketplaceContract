import {ethers} from "hardhat"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers"
import {Contract} from "@ethersproject/contracts"
import {expect} from "chai"
import {keccak256} from "ethers/lib/utils"
import {BigNumber} from "ethers";
import * as helpers from "@nomicfoundation/hardhat-network-helpers";


const hre = require("hardhat");
describe("HeroMarketplace", function () {
    let owner: SignerWithAddress,
        alice: SignerWithAddress,
        bob: SignerWithAddress,
        carol: SignerWithAddress,
        dev: SignerWithAddress;
    let token: Contract;
    let vault: Contract;
    let nft: Contract;
    let market: Contract;

    beforeEach(async () => {
        await ethers.provider.send("hardhat_reset", []);
        [owner, alice, bob, carol, dev] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Floppy", owner);
        token = await Token.deploy();
        const Vault = await ethers.getContractFactory("Vault", owner);
        vault = await Vault.deploy();
        const NFT = await ethers.getContractFactory("Hero", owner);
        nft = await NFT.deploy();
        const Market = await ethers.getContractFactory("HeroMarketplace", owner);
        market = await Market.deploy(token.address, nft.address);
    })

    function parseEther(amount: Number) {
        return ethers.utils.parseUnits(amount.toString(), 18)
    }

    const mintNFT = async (minter: string, heroType: BigNumber) => {
        const transaction = await nft.mint(minter, heroType);
        const receipt = await transaction.wait();
        const args = receipt.events[1].args;
        const _tokenId = args.tokenId;
        return _tokenId;
    }

    const mintAndListNFT = async (signer: SignerWithAddress, heroType: BigNumber, price: BigNumber) => {
        const _tokenId = await mintNFT(signer.address, heroType);
        await nft.connect(signer).approve(market.address, _tokenId);
        await market.connect(signer).listNFT(_tokenId, price);
        return _tokenId;
    }

    describe("setTax", () => {
        it("should set tax equal to _tax if caller is owner and revert if caller is not owner", async () => {
            const _tax = 10;
            const transaction = await market.setTax(_tax);
            const receipt = await transaction.wait();
            const args = receipt.events[0].args
            expect(args.tax).equal(_tax);

            const user_transaction = market.connect(alice).setTax(_tax);
            await expect(user_transaction).revertedWith("Ownable: caller is not the owner")
        });
    })
    
    describe("setToken", () => {
        it("should set token to _token if caller is owner and revert if caller is not owner", async () => {
            const _token = vault.address;
            const transaction = await market.setToken(_token);
            const receipt = await transaction.wait();
            const args = receipt.events[0].args
            expect(args._token).equal(_token)

            const user_transaction = market.connect(alice).setToken(_token);
            await expect(user_transaction).revertedWith("Ownable: caller is not the owner")
        })
    })

    describe("setNFT", () => {
        it("should set nft to _nft if caller is owner and revert if caller is not owner", async () => {
            const _nft = dev.address;
            const transaction = await market.setNFT(_nft);
            const receipt = await transaction.wait();
            const args = receipt.events[0].args
            expect(args._nft).equal(_nft)

            const user_transaction = market.connect(alice).setNFT(_nft);
            await expect(user_transaction).revertedWith("Ownable: caller is not the owner")
        })
    })

    describe("listNFT", () => {
        it("should revert if caller is not the owner", async () => {
            // From Alice mint a NFT and list by others.
            const heroType = BigNumber.from("1");
            const _tokenId = mintNFT(alice.address, heroType);
            const listNFT =  market.listNFT(_tokenId, 1);
            await expect(listNFT).revertedWith("You're not the owner of this NFT")
        })
        it("should revert if marketplace is not approved to transfer this NFT", async () => {
            const heroType = BigNumber.from("1");
            const _tokenId = mintNFT(alice.address, heroType);
            const listNFT =  market.connect(alice).listNFT(_tokenId, 1);
            await expect(listNFT).revertedWith("Market place is not approved to transfer this NFT")
        })

        it("should list NFT on the market if all requirements are met", async () => {
            const heroType = BigNumber.from("1");
            const _tokenId = await mintNFT(alice.address, heroType);
            await nft.connect(alice).approve(market.address, _tokenId);
            const transaction = await market.connect(alice).listNFT(_tokenId, 1);
            const receipt = await transaction.wait();
            const args = receipt.events[2].args;
            expect(args._from).equal(alice.address);
            expect(args._tokenId).to.equal(_tokenId);
            expect(args._price).to.equal(1);
        })
    })

    describe("getListedNFT", () => {
        it("should return a list NFT being listed on the market ", async () => {
            const heroType = BigNumber.from("4");
            const _tokenId = await mintNFT(alice.address, heroType);
            await nft.connect(alice).approve(market.address, _tokenId);
            const transaction = await market.connect(alice).listNFT(_tokenId, 1);
            
            const bob_heroType = BigNumber.from("4");
            const bob_tokenId = await mintNFT(bob.address, bob_heroType);
            await nft.connect(bob).approve(market.address, bob_tokenId);
            const bob_transaction = await market.connect(bob).listNFT(bob_tokenId, 2);

            const listedNFT = await market.getListedNFT();
            expect(listedNFT[0].author).equal(alice.address);
            expect(listedNFT[0].price).equal(1);
            expect(listedNFT[0].tokenId).equal(_tokenId);

            expect(listedNFT[1].author).equal(bob.address);
            expect(listedNFT[1].price).equal(2);
            expect(listedNFT[1].tokenId).equal(bob_tokenId);
        })
    })

    describe("updateListingNFTPrice", () => {
        it("should revert if nft does not exist on market", async () => {
            const heroType = BigNumber.from("1");
            const _tokenId = await mintNFT(alice.address, heroType);
            const transaction = market.updateListingNFTPrice(_tokenId, 3);
            await expect(transaction).revertedWith("This NFT doesn't exist on Marketplace")
        })

        it("should revert if caller is not owner", async () => {
            const heroType = BigNumber.from("1");
            const _tokenId = await mintNFT(alice.address, heroType);
            await nft.connect(alice).approve(market.address, _tokenId);
            await market.connect(alice).listNFT(_tokenId, 1);
            const transaction = market.connect(bob).updateListingNFTPrice(_tokenId, 3);
            await expect(transaction).revertedWith("Only the owner can update the price");
        })

        it("should update price if all requirements are met", async () => {
            const heroType = BigNumber.from("1");
            const _tokenId = await mintNFT(alice.address, heroType);
            await nft.connect(alice).approve(market.address, _tokenId);
            await market.connect(alice).listNFT(_tokenId, 1);
            const transaction = await market.connect(alice).updateListingNFTPrice(_tokenId, 3);
            const receipt = await transaction.wait();
            const args = receipt.events[0].args;
            expect(args._tokenId).equal(_tokenId);
            expect(args._price).equal(3);
        })
    })

    describe("unlistNFT", () => {
        it("should revert if nft does not exist on market", async () => {
            const heroType = BigNumber.from("1");
            const _tokenId = await mintNFT(alice.address, heroType);
            const transaction = market.unlistNFT(_tokenId);
            await expect(transaction).revertedWith("This NFT doesn't exist on Marketplace")
        })

        it("should revert if caller is not owner", async () => {
            const heroType = BigNumber.from("1");
            const _tokenId = await mintNFT(alice.address, heroType);
            await nft.connect(alice).approve(market.address, _tokenId);
            await market.connect(alice).listNFT(_tokenId, 1);
            const transaction = market.connect(bob).unlistNFT(_tokenId);
            await expect(transaction).revertedWith("Only the owner can unlist the NFT");
        })

        it("should unlist the NFT if all requirements are met", async () => {
            const heroType = BigNumber.from("1");
            const price = 1;
            const _tokenId = await mintAndListNFT(alice, heroType, parseEther(price));
            const transaction = await market.connect(alice).unlistNFT(_tokenId);
            const receipt = await transaction.wait();
            const args = receipt.events[2].args;

            expect(args._from).equal(alice.address)
            expect(args._tokenId).to.equal(_tokenId)
        })
    })

    describe("buyNFT", () => {
        it("should revert if insufficient account balance", async () => {
            const heroType = BigNumber.from("1");
            const price = 50;
            const _tokenId = await mintAndListNFT(alice, heroType, parseEther(price));
            const transaction = market.connect(alice).buyNFT(_tokenId, 1);
            await expect(transaction).revertedWith("Insufficient account balance")
        })

        it("should revert if nft does not exist on market", async () => {
            const heroType = BigNumber.from("1");
            const _tokenId = await mintNFT(alice.address, heroType);
            const transaction = market.buyNFT(_tokenId, 1);
            await expect(transaction).revertedWith("This NFT doesn't exist on Marketplace")
        })

        it("should revert if minimum price has not been reached", async () => {
            const heroType = BigNumber.from("1");
            const price = 50;
            const _tokenId = await mintAndListNFT(alice, heroType, parseEther(price));
            await token.transfer(alice.address, parseEther(10000))
            const transaction = market.connect(alice).buyNFT(_tokenId, 30);
            await expect(transaction).revertedWith("Minimum price has not been reached")
        })

        it("should transfer ownership to the buyer and send price for the seller", async () => {
            const heroType = BigNumber.from("1");
            const price = 50;
            const _tokenId = await mintAndListNFT(alice, heroType, parseEther(price));
            await token.transfer(bob.address, parseEther(10000));
            await token.connect(bob).approve(market.address,  parseEther(price));
            const bMarketBalance = await ethers.provider.getBalance(market.address);
            
            const beforeBuyerBalance = await token.balanceOf(bob.address);
            const beforeSellerBalance = await token.balanceOf(alice.address);
            const contractBalance = await token.balanceOf(market.address)
            console.log(`Before:\nBuyer Blance: ${beforeBuyerBalance}\t Seller Balance: ${beforeSellerBalance}`);

            const transaction = await market.connect(bob).buyNFT(_tokenId, parseEther(price));
            const receipt = await transaction.wait();
            const aMarketBalance = await ethers.provider.getBalance(market.address);

            console.log(bMarketBalance, aMarketBalance)
            const args = receipt.events[5].args;
            
            const afterBuyerBalance = await token.balanceOf(bob.address);
            const afterSellerBalance = await token.balanceOf(alice.address);
            const newContractBalance = await token.balanceOf(market.address)
            // console.log(`Before:\nBuyer Blance: ${afterBuyerBalance}\t Seller Balance: ${afterSellerBalance}`);
            // console.log(args);

            const tax = 10;
            const sellerProfit = Math.floor((price * (100 - tax)) / 100)
            const fee = price -  sellerProfit;
            
            // Buyer spend exactly the price of the NFT
            const diffBuyer = beforeBuyerBalance.sub(afterBuyerBalance);
            expect(diffBuyer).to.equal(parseEther(price));

            // Seller receive (100-tax)% of the price of the NFT
            const diffSeller = afterSellerBalance.sub(beforeSellerBalance);
            expect(diffSeller).to.equal(parseEther(sellerProfit));

            // Market contract keep exactly tax amount
            const diffContract = newContractBalance.sub(contractBalance);
            expect(diffContract).to.equal(parseEther(fee));
            
            // Change ownership of the nft to the buyer
            const owner = await nft.ownerOf(_tokenId);
            expect(owner).to.equal(bob.address);
        })
    })

    describe("withdraw", async () => {
        it("should revert if caller is not owner", async () => {
            const transaction = market.connect(alice).withdraw()
            await expect(transaction).revertedWith("Ownable: caller is not the owner")
        })

        it("should transfer balance to the owner from market contract", async () => {
            await helpers.setBalance(market.address, hre.ethers.utils.parseEther("1"));
            const beforeMarketBalance = await market.provider.getBalance(market.address);
            const beforeOwnerBalance = await owner.getBalance();

            const transaction = await market.connect(owner).withdraw();
            const receipt = await transaction.wait();
            const gas = receipt.gasUsed.mul(receipt.effectiveGasPrice);

            const afterMarketBalance = await market.provider.getBalance(market.address);
            const afterOwnerBalance = await owner.getBalance();
            
            const marketDiff = beforeMarketBalance.sub(afterMarketBalance);
            const ownerDiff = afterOwnerBalance.sub(beforeOwnerBalance).add(gas); 
            expect(marketDiff).equal(ownerDiff);
            expect(marketDiff).equal(hre.ethers.utils.parseEther("1"));
        })
    })

    describe("withdrawToken", async () => {
        it("should revert if caller is not owner", async () => {
            const transaction = market.connect(alice).withdrawToken(1)
            await expect(transaction).revertedWith("Ownable: caller is not the owner")
        })

        it("should revert if insufficient account balance", async () => {
            const transaction = market.withdrawToken(1)
            await expect(transaction).revertedWith("Insufficient account balance")
        })

        it("should transfer amount of token to the owner from market contract", async() => {
            await token.transfer(market.address, parseEther(10000));
            const ownerBalance = await token.balanceOf(owner.address);
            const marketBalance = await token.balanceOf(market.address);

            const amount = parseEther(1000);
            await market.withdrawToken(amount);
            const afterOwnerBalance = await token.balanceOf(owner.address);
            const afterMarketBalance = await token.balanceOf(market.address);
            
            const marketDiff = marketBalance.sub(afterMarketBalance);
            const ownerDiff = afterOwnerBalance.sub(ownerBalance);
            
            expect(marketDiff).equal(ownerDiff);
            expect(amount).equal(marketDiff);
        })
    })

    describe("withdrawToken", async () => {
        it("should revert if caller is not owner", async () => {
            const transaction = market.connect(alice).withdrawERC20()
            await expect(transaction).revertedWith("Ownable: caller is not the owner")
        })

        it("should transfer all of the erc20 token to the owner from market contract", async() => {
            await token.transfer(market.address, parseEther(10000));
            const ownerBalance = await token.balanceOf(owner.address);
            const marketBalance = await token.balanceOf(market.address);

            await market.withdrawERC20();
            const afterOwnerBalance = await token.balanceOf(owner.address);
            const afterMarketBalance = await token.balanceOf(market.address);
            
            const marketDiff = marketBalance.sub(afterMarketBalance);
            const ownerDiff = afterOwnerBalance.sub(ownerBalance);
            
            expect(marketDiff).equal(ownerDiff);
            expect(marketBalance).equal(marketDiff);
        })
    })

})
