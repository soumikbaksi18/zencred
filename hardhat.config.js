require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./src",
  },
  networks: {
    zkEVM: {
      url: `https://polygonzkevm-testnet.g.alchemy.com/v2/AkOEotTfIJF5Zgz6gNRH4xna1lApnlaK`,
      accounts: [
        `0x39f756447f97315592c96b289aa50d6b379d82d8011aa19b90ac053c21301a6c`,
      ],
    },
  },
};
