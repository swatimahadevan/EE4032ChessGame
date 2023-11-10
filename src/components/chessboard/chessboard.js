import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import "./chessboard.css"; // Import your CSS file

const ChessBoard = () => {
  const [chess] = useState(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(chess.fen());
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleMove = (x, y, new_x, new_y) => {
    const chessMove = chess.move({
      from: `${x}${y}`,
      to: `${new_x}${new_y}`,
      promotion: "q",
    });

    if (chessMove) {
      setTimeout(() => {
        const moves = chess.moves();

        if (moves.length > 0) {
          const computerMove =
            moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
      setSelectedSquare(null);
    }
  };

  const handleSquareClick = (square) => {
    const moves = chess.moves({ square: square });

    if (moves.length > 0) {
      setSelectedSquare(square);
    }
  };

  const highlightSquare = (square) => {
    const validMoves = chess.moves({ square: square });
    const squaresToHighlight = validMoves.map((move) => move.to);

    return {
      [square]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      ...squaresToHighlight.reduce((acc, curr) => {
        acc[curr] = {
          backgroundColor: "rgba(0, 128, 0, 0.4)", // You can customize the color
        };
        return acc;
      }, {}),
    };
  };

  return (
    <div className="flex-center chessboard-container">
      <h1>Play Against AI</h1>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove(
            move.sourceSquare[0],
            move.sourceSquare[1],
            move.targetSquare[0],
            move.targetSquare[1]
          )
        }
        onMouseOverSquare={(square) => setSelectedSquare(square)}
        onMouseOutSquare={() => setSelectedSquare(null)}
        squareStyles={selectedSquare ? highlightSquare(selectedSquare) : {}}
        onSquareClick={(square) => handleSquareClick(square)}
      />
    </div>
  );
};

export default ChessBoard;
