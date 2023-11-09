import { Link } from "react-router-dom";

export const BackgroundCovered = '#282c34';
export const BackgroundUncovered = 'white';
export const MessageColorCovered = 'white';
export const MessageColorUncovered = 'black';

export const HighlightColor = 'yellow';
export const LinkColor = '#61dafb';
export const TopbarColor = '#61dafb';

export const GlobalToolBar = () => {
    return (
        <div className = "global-toolbar">
            <Link to = "/EE4032ChessGame/">Login</Link>
            &nbsp;|&nbsp;
            <Link to = "/EE4032ChessGame/profile">Profile</Link>
            &nbsp;|&nbsp;
            <Link to = "/EE4032ChessGame/storage">Storage</Link>
            &nbsp;|&nbsp;
            <Link to = "/EE4032ChessGame/history">History</Link>
            &nbsp;|&nbsp;
            <Link to = "/EE4032ChessGame/chessboard">Chess Game</Link>
        </div>
    )
}