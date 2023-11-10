import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import "./chessboard.css"; // Import your CSS file

const ChessBoard = () => {
  const [chess] = useState(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(chess.fen());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [capturedPieces, setCapturedPieces] = useState({});
  const [gameStatus, setGameStatus] = useState("");
  const [winner, setWinner] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (chess.isGameOver()) {
      const winner = chess.turn() === "w" ? "Black" : "White";
      setWinner(winner);
      setGameStatus(`Checkmate! ${winner} wins!`);
    } else if (chess.isDraw()) {
      setGameStatus("Draw! Game Over.");
    } else if (chess.isStalemate()) {
      setGameStatus("Stalemate! Game Over.");
    } else if (chess.isThreefoldRepetition()) {
      setGameStatus("Threefold Repetition! Game Over.");
    }
  }, [chess]);

  const handleSquareMouseOver = (square) => {
    const validMoves = chess.moves({ square: square });

    if (validMoves.length > 0) {
      setHoveredSquare(square);
    }
  };

  const handleSquareMouseOut = () => {
    setHoveredSquare(null);
  };

  const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;
  
    const validMoves = chess.moves({ square: pieceSquare });
    const validMoveSquares = validMoves.map((move) => move.to);
  
    const highlightStyles = validMoveSquares.reduce((acc, curr) => {
      acc[curr] = {
        backgroundColor: "rgba(0, 128, 0, 0.4)",
      };
      return acc;
    }, {});
  
    return {
      [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      ...(history.length && {
        [sourceSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)",
        },
      }),
      ...(history.length && {
        [targetSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)",
        },
      }),
      ...highlightStyles,
    };
  };
  const handleMove = (x, y, new_x, new_y) => {
    try {
      const chessMove = chess.move({
        from: `${x}${y}`,
        to: `${new_x}${new_y}`,
        promotion: "q",
      });

      // Check if the move is valid
      if (!chessMove) {
        setErrorMessage("Invalid move. Please try again.");
        return;
      }

      // Clear any previous error message
      setErrorMessage("");

      // Check for captures
      const capturedPiece = chess.get(`${new_x}${new_y}`);
      if (capturedPiece) {
        setCapturedPieces((prevCaptured) => ({
          ...prevCaptured,
          [capturedPiece]: (prevCaptured[capturedPiece] || 0) + 1,
        }));
      }

      setFen(chess.fen());
      updateCapturedPieces();

      // Check for winner after each move
      if (chess.isGameOver()) {
        const winner = chess.turn() === "w" ? "Black" : "White";
        setWinner(winner);
        setGameStatus(`Checkmate! ${winner} wins!`);
      } else {
        setTimeout(() => {
          const moves = chess.moves();
          if (moves.length > 0) {
            const computerMove = getBestMove();
            const computerMoveResult = chess.move(computerMove);

            // Check for captures in computer move
            if (computerMoveResult && computerMoveResult.captured) {
              setCapturedPieces((prevCaptured) => ({
                ...prevCaptured,
                [computerMoveResult.captured]: (prevCaptured[computerMoveResult.captured] || 0) + 1,
              }));
            }

            setFen(chess.fen());
            updateCapturedPieces();

            // Check for winner after computer move
            if (chess.isGameOver()) {
              const winner = chess.turn() === "w" ? "Black" : "White";
              setWinner(winner);
              setGameStatus(`Checkmate! ${winner} wins!`);
            }
          }
        }, 300);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Invalid move. Please try again.");
    }
  };

  const getBestMove = () => {
    const moves = chess.moves();
    return moves[Math.floor(Math.random() * moves.length)];
  };

  const updateCapturedPieces = () => {
    const captured = chess
      .history({ verbose: true })
      .filter(move => move.captured)
      .reduce((acc, move) => ({ ...acc, [move.captured]: (acc[move.captured] || 0) + 1 }), {});
    setCapturedPieces((prevCaptured) => ({ ...prevCaptured, ...captured }));
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
  
    const highlightStyles = squaresToHighlight.reduce((acc, curr) => {
      acc[curr] = {
        backgroundColor: "rgba(0, 128, 0, 0.4)",
      };
      return acc;
    }, {});
  
    return {
      ...highlightStyles,
      [square]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    };
  };

  useEffect(() => {
    const savedFen = localStorage.getItem("chessFen");
    if (savedFen) {
      chess.load(savedFen);
    }
    setFen(chess.fen());
  }, []);

  // Save the current FEN to local storage on each move
  useEffect(() => {
    localStorage.setItem("chessFen", chess.fen());
  }, [fen]);

  const handleNewGame = () => {
    chess.reset();
    setFen(chess.fen());
    setGameStatus("");
    setWinner(null);
    setCapturedPieces({});
  };

  const handleQuitGame = () => {
    handleNewGame();
  };
  
  return (
    <div className="flex-center chessboard-container">
    <h1>Play Against AI</h1>
    <div className="game-status">{gameStatus}</div>
    {winner && <div className="winner">Winner: {winner}</div>}
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <div>
      <button className="new-game-button" onClick={handleNewGame}>New Game</button>
    </div>
    {/* ... (existing code) */}
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
        onMouseOverSquare={(square) => handleSquareMouseOver(square)}
        onMouseOutSquare={() => handleSquareMouseOut()}
        squareStyling={(square) => (selectedSquare ? highlightSquare(selectedSquare) : squareStyling(square))}
        onSquareClick={(square) => handleSquareClick(square)}
      />
    </div>
  );
};

export default ChessBoard;
