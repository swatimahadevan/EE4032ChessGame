// History.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { Stack, Button, Text } from '@chakra-ui/react';

import "./history.css"; // Import your CSS file

const History = ({getHistory, getAmountBet}) => {
    const [chess] = useState(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
      );

    const [amountBet, setAmountBet] = useState(0)
    const [moveNum, setMoveNum] = useState(0);
    const [fen, setFen] = useState(chess.fen())
    const [moves, setMoves] = useState([]); // playerMoveSrc, playerMoveDst, AIMoveSrc, AIMoveDst, ...
    useEffect(() => {
        const fn = async() => {
            const amtBet = await getAmountBet() || 0;
            const moveHistory = await getHistory();
            setAmountBet(amtBet)
            setMoves(moveHistory.match(/.{1,2}/g) || []);
        }

        fn()
    }, [])

    useEffect(() => {
        for (let i = 0; i < moveNum * 2; i+=2) {
            chess.move({
                from: moves[i],
                to: moves[i + 1],
                promotion: "q",
            })
        }
        setFen(chess.fen())

    }, [moveNum])

    const setMoveNumWrapper = useCallback((num) => {
        setMoveNum(num)
        chess.reset()
    }, [])

    return (
        <div className="flex-center history-container">
            <div>Amount Bet: {amountBet}</div>
            <Chessboard
                width={400}
                position={fen}
            />
            <Stack direction="row" spacing={4}>
                <Button isDisabled = {moveNum === 0} onClick = {() => setMoveNumWrapper(moveNum - 1)}>Prev</Button>
                <Text fontSize='2xl'>{moveNum}</Text>
                <Button isDisabled = {moveNum === moves.length / 2} onClick = {() => setMoveNumWrapper(moveNum + 1)}>Next</Button>
            </Stack>
        </div>
    )
}

export default History;