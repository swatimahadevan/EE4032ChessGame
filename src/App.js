import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import ChessBoard from "./components/chessboard/chessboard";

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path = "/ChessBoard" element = {<ChessBoard/>}></Route>
    </Routes>
</div>
  );
}

export default App;
