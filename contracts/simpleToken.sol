//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
contract SimpleToken is ERC20{
   
    constructor(string memory token,string memory symbol, uint256 totalSupply) ERC20(token,symbol){
        _mint(_msgSender(),totalSupply);
    }
}
