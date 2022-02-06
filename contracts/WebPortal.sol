// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WebPortal {
  uint256 totalWaves;

  constructor() {
    console.log("Yippeee!!! I just ran my first smart contract on blockchain");
  }

  function wave() public {
    totalWaves += 1;
    console.log("%s has waved!", msg.sender);
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
}