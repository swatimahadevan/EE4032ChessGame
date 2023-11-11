// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;
contract Chess {
    struct Move {
        string oldCoord;
        string newCoord;
    }

    address public server = 0x121bdE1406383681Aeba79bF1d04559d9400Bad0;
    // uint MAX_BET_AMOUNT = 10;

    mapping(address => uint) public bets;
    mapping(address => Move[]) public moves;
    mapping(address => bool) public hasEnded;


    function start() public payable {
        // require (msg.value <= MAX_BET_AMOUNT, "Bet amount too high");

        bets[msg.sender] = msg.value;
        hasEnded[msg.sender] = false;
        delete moves[msg.sender];
    }

    function move(string memory oldCoord, string memory newCoord) public {
        require(!hasEnded[msg.sender], "Session has already ended");
        moves[msg.sender].push(Move(oldCoord, newCoord));
    }

    function getHistoryMoves() public view returns(string memory) {
        string memory text = "";
        for(uint i = 0; i < moves[msg.sender].length; i++) {
          string memory coord = string.concat(moves[msg.sender][i].oldCoord, moves[msg.sender][i].newCoord);
          text = string.concat(text, coord);
        }

        return text;
    }

    function getBetAmount() public view returns(uint) {
        return bets[msg.sender];
    }

    function ends(address playerAddress, bool playerWin) public payable {
        require(msg.sender == server, "Only authorized server can call ends");
        require(!hasEnded[playerAddress], "Session has already ended for this player");

        if (playerWin) {
            payable(playerAddress).transfer(bets[playerAddress] + msg.value);
        } else {
            payable(server).transfer(bets[playerAddress] + msg.value);
        }

        hasEnded[playerAddress] = true;
    }
}