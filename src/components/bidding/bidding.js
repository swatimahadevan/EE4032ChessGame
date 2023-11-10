// Bidding.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chessboard from "chessboardjsx";
import Cookies from "js-cookie";

import "./bidding.css"; // Import your CSS file

const Bidding = () => {
  const [biddingAmount, setBiddingAmount] = useState("");
  const navigate = useNavigate();

  const handleBidChange = (event) => {
    let input = event.target.value;
  
    // Remove leading zero if present
    if (input.length > 1 && input[0] === '0') {
      input = input.slice(1);
    }
  
    const amount = parseFloat(input);
    setBiddingAmount(isNaN(amount) ? 0 : amount);
  };
  

  const handleBidSubmit = () => {
    Cookies.set("biddingAmount", biddingAmount);
    navigate("/EE4032ChessGame/chessboard");
  };

  return (
    <div className="flex-center chessboard-container">
      <h2>Enter your bidding amount:</h2>
      <label htmlFor="biddingAmount">Bidding Amount:</label>
      <input
  id="biddingAmount"
  type="number"
  value={biddingAmount}
  onChange={handleBidChange}
  placeholder="Enter amount"
  title="Enter a positive bidding amount"
/>
      {biddingAmount <= 0 && (
        <p className="error-text">Please enter a valid bidding amount.</p>
      )}
      <button onClick={handleBidSubmit}>
        Start Chess Game
      </button>
    </div>
  );
};

export default Bidding;
