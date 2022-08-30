// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract WavePortal {

    struct Wave {
        string message;
        address owner;
    }

    uint public totalWaves;
    Wave[] private waves;

    function wave(string memory message) public {
        totalWaves += 1;
        waves.push(Wave(message, msg.sender));
    }

    function allWaves() view public returns (Wave[] memory) {
        return waves;
    }
}
