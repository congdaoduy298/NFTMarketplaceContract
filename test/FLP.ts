// TEST FLP TOKEN

import {expect} from "chai"
import {ethers} from "hardhat"
import {Contract} from "@ethersproject/contracts"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers"
import * as chai from "chai"
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
import {keccak256} from "ethers/lib/utils"

function parseEther(amount: Number) {
    return ethers.utils.parseUnits(amount.toString(), 18)
}

describe('Vault', function () {
    let owner: SignerWithAddress,
        alice: SignerWithAddress,
        bob: SignerWithAddress,
        carol: SignerWithAddress,
        dev: SignerWithAddress;
    let vault: Contract;
    let token: Contract;
    let flp: Contract;

    beforeEach(async ()=>{
        await ethers.provider.send("hardhat_reset", []);
        [owner, alice, bob, carol, dev] = await ethers.getSigners();

        const Vault = await ethers.getContractFactory("Vault", owner);
        vault = await Vault.deploy();
        const Token = await ethers.getContractFactory("Floppy", owner);
        token = await Token.deploy();
        const FLP = await ethers.getContractFactory("FLPCrowdsale", owner);
        flp = await FLP.deploy();

        await vault.setToken(token.address)
    })

    it("Should deposit into the Vault", async () => {
        await token.transfer(alice.address, parseEther(10000))
        await token.connect(alice).approve(flp.address, token.balanceOf(alice.address))
        await flp.connect(alice).deposit(parseEther(10000))

        expect(await token.balanceOf(flp.address)).equal(parseEther(500*10**3));
    })

    it("Should transfer token", async () => {
        await token.transfer(alice.address, parseEther(10000))
        await token.connect(alice).approve(dev.address, token.balanceOf(alice.address))
        await vault.connect(alice).deposit(parseEther(500*10**3))
        expect(await token.balanceOf(vault.address)).equal(parseEther(500*10**3));
    })

    it("Should withdraw from the Vault", async () => {
        // Cap quyen rut cho Bob
        let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
        await vault.grantRole(WITHDRAWER_ROLE, bob.address)

        // Thiet lap so luong token rut toi da
        await vault.setWithdrawEnable(true)
        await vault.setMaxWithdrawAmount(parseEther(1*10**6))

        // Alice nap token vao vault
        await token.transfer(alice.address, parseEther(1*10**6))
        await token.connect(alice).approve(vault.address, token.balanceOf(alice.address))
        await vault.connect(alice).deposit(parseEther(500*10**3))
        
        // Bob rut token tu vault
        await vault.connect(bob).withdraw(parseEther(200*10**3), alice.address)

        expect(await token.balanceOf(alice.address)).equal(parseEther(700*10**3))
        expect(await token.balanceOf(vault.address)).equal(parseEther(300*10**3))
    })

    it("Should not deposit, Insufficient account balance", async () => {
        await token.transfer(alice.address, parseEther(1*10**6))
        await token.connect(alice).approve(vault.address, token.balanceOf(alice.address))

        await expect(vault.connect(alice).deposit(parseEther(2*10**6))).revertedWith('Insufficient amount balance')
    })

    it("Should not withdraw, Withdraw is not enabled", async () => {
        // Cap quyen rut cho Bob
        let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
        await vault.grantRole(WITHDRAWER_ROLE, bob.address)

        // Thiet lap so luong token rut toi da
        await vault.setWithdrawEnable(false)
        await vault.setMaxWithdrawAmount(parseEther(1*10**6))

        // Alice nap token vao vault
        await token.transfer(alice.address, parseEther(1*10**6))
        await token.connect(alice).approve(vault.address, token.balanceOf(alice.address))
        await vault.connect(alice).deposit(parseEther(500*10**3))
        
        // Bob rut token tu vault
        await expect(vault.connect(bob).withdraw(parseEther(200*10**3), alice.address)).revertedWith("Withdraw is not enabled")
    })

    it("Should not withdraw, Exceed max amount", async () => {
        // Cap quyen rut cho Bob
        let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
        await vault.grantRole(WITHDRAWER_ROLE, bob.address)

        // Thiet lap so luong token rut toi da
        await vault.setWithdrawEnable(true)
        await vault.setMaxWithdrawAmount(parseEther(1*10**6))

        // Alice nap token vao vault
        await token.transfer(alice.address, parseEther(1*10**6))
        await token.connect(alice).approve(vault.address, token.balanceOf(alice.address))
        await vault.connect(alice).deposit(parseEther(500*10**3))
        
        // Bob rut token tu vault
        await expect(vault.connect(bob).withdraw(parseEther(2*10**6), alice.address)).revertedWith("Exceed maximum amount")
        
    })

    it("Should not withdraw, Caller is not a withdrawer", async () => {
        // Thiet lap so luong token rut toi da
        await vault.setWithdrawEnable(true)
        await vault.setMaxWithdrawAmount(parseEther(1*10**6))

        // Alice nap token vao vault
        await token.transfer(alice.address, parseEther(1*10**6))
        await token.connect(alice).approve(vault.address, token.balanceOf(alice.address))
        await vault.connect(alice).deposit(parseEther(500*10**3))
        
        // Bob rut token tu vault
        await expect(vault.connect(bob).withdraw(parseEther(200*10**3), alice.address)).revertedWith("Caller is not a withdrawer")
    })

    it("Should not withdraw, ERC20: transfer amount exceeds balance", async () => {
        // Cap quyen rut cho Bob
        let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
        await vault.grantRole(WITHDRAWER_ROLE, bob.address)

        // Thiet lap so luong token rut toi da
        await vault.setWithdrawEnable(true)
        await vault.setMaxWithdrawAmount(parseEther(5*10**6))

        // Alice nap token vao vault
        await token.transfer(alice.address, parseEther(1*10**6))
        await token.connect(alice).approve(vault.address, token.balanceOf(alice.address))
        await vault.connect(alice).deposit(parseEther(500*10**3))
        
        // Bob rut token tu vault
        await expect(vault.connect(bob).withdraw(parseEther(2*10**6), alice.address)).revertedWith("ERC20: transfer amount exceeds balance")
        
    })
    
})
