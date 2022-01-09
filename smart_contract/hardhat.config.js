// https://eth-ropsten.alchemyapi.io/v2/wwmzZuvDRfRJ2VrKRsdXWvmuOHtUj5QQ
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks:{
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/wwmzZuvDRfRJ2VrKRsdXWvmuOHtUj5QQ',
      accounts:['6c0198bf65c52a2989dd19beb6097732dd0f70a344919e0b018c21f62ebfddb0' ]
    }
  }
}