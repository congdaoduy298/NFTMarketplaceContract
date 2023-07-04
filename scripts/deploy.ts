import {ethers, hardhatArguments} from "hardhat"
import * as Config from "./config"

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : "dev";
    const [deployer] = await ethers.getSigners()
    console.log("Deploying from address: ", deployer.address) 

    // const Floppy = await ethers.getContractFactory("Floppy");
    // const floppy = await Floppy.deploy();
    // console.log("Floppy address: ", floppy.address) 
    // Config.setConfig(network + ".Floppy", floppy.address)

    // const Vault = await ethers.getContractFactory("Vault");
    // const vault = await Vault.deploy();
    // console.log("Vault address: ", vault.address) 
    // Config.setConfig(network + ".Vault", vault.address)

    // const USDT = await ethers.getContractFactory("USDT");
    // const usdt = await USDT.deploy();
    // console.log("USDT address: ", usdt.address) 
    // Config.setConfig(network + ".USDT", usdt.address)

    // const Ico = await ethers.getContractFactory("FLPCrowdSale");
    // const ico = await Ico.deploy(3050, 10, "0xA8b313cC0C4C4B4892D8F6BBc7E440547f569Cb8", "0xF52254b56ad7482A1721fc9B4B3e7F1ba793E0a9", "0x039E52Ed19D21EfEaD66d0F4a668140bbDAdEf4d");
    // console.log("ICO address: ", ico.address) 
    // Config.setConfig(network + ".ICO", ico.address)

    // const Hero = await ethers.getContractFactory("Hero");
    // const hero = await Hero.deploy();
    // console.log("Hero address: ", hero.address) 
    // Config.setConfig(network + ".Hero", hero.address)

    // const Market = await ethers.getContractFactory("HeroMarketplace");
    // const market = await Market.deploy("0xF52254b56ad7482A1721fc9B4B3e7F1ba793E0a9", "0x22f76B1a6fF9a126CB28C4111c78FbE09D83fD20");
    // console.log("Hero marketplace address: ", market.address) 
    // Config.setConfig(network + ".Marketplace", market.address)

    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy("0xF52254b56ad7482A1721fc9B4B3e7F1ba793E0a9", "0x22f76B1a6fF9a126CB28C4111c78FbE09D83fD20");
    console.log("Auction contract address: ", auction.address) 
    Config.setConfig(network + ".Auction", auction.address)

    await Config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });