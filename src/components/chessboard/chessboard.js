import React, { Component } from "react";

import WithMoveValidation from "./WithMoveValidation";

class ChessBoard extends Component {
  render() {
    return (
      <div>
        <div style={boardsContainer}>
          <WithMoveValidation />
        </div>
      </div>
    );
  }
}

export default ChessBoard;

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100vw",
  marginTop: 30,
  marginBottom: 50
};
