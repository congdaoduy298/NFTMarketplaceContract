import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  networks: {
    bsctest: {
      url: process.env.BSCTEST_URL,
      accounts: [process.env.BSCTEST_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.BSCTEST_API_KEY,
  },
};

export default config;
/** @type import('hardhat/config').HardhatUserConfig */
