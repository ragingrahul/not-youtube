require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});

const ALCHEMY_HTTP=process.env.ALCHEMY_HTTP
const PRIVATE_KEY=process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    mumbai:{
      url:ALCHEMY_HTTP,
      accounts:[PRIVATE_KEY],
    }
  },
  paths:{
    artifacts:"./artifacts"
  }
};
