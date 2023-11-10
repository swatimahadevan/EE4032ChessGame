// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
contract Chess {
    struct Move {
        string oldCoord;
        string newCoord;
    }

    address payable public server = payable(address(bytes20(bytes32(bytes("0xD5342e25cB392b5FF20E0BdaDE80335bD771CfAE")))));
    uint MAX_BET_AMOUNT = 10;

    mapping(address => uint) public bets;
    mapping(address => Move[]) public moves;
    mapping(address => bool) public hasEnded;

    function start() public payable {
        require (msg.value <= MAX_BET_AMOUNT, "Bet amount too high");

        bets[msg.sender] = msg.value;
        hasEnded[msg.sender] = false;
        delete moves[msg.sender];
    }

    function move(string memory oldCoord, string memory newCoord) public {
        require(!hasEnded[msg.sender], "Session has already ended");
        
        moves[msg.sender].push(Move(oldCoord, newCoord));
    }

    function getHistoryMoves() public view returns(Move[] memory) {
        return moves[msg.sender];
    }

    function ends(bool playerWin) public {
        require(!hasEnded[msg.sender], "Session has already ended");

        if (playerWin) {
            payable(msg.sender).transfer(bets[msg.sender] * 2);
        } else {
            server.transfer(bets[msg.sender]);
        }

        hasEnded[msg.sender] = true;
    }
}