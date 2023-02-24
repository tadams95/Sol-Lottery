// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    address public manager;
    address[] public players;

    function lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {

      require(msg.value > 0.01 ether);

        players.push(msg.sender);
    }
}
