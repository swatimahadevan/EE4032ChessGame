import './login.css';
import '../../global.css';
import logo from '../../images/logo.svg';
import Cookies from 'js-cookie';

export default function Login(props) {

    const NoMetamask = () => {
        return (
            <div>
                <p>
                    <span style={{ fontWeight: 'bold', color: 'black' }}>
                        No MetaMask detected.
                        <br></br>
                        Please install&nbsp;
                    </span>
                    <span className="login-highlight" style={{ fontWeight: 'bold', color: 'black' }}>
                        METAMASK
                    </span>
                    <span style={{ fontWeight: 'bold', color: 'black' }}>
                        &nbsp;to your browser to proceed.
                    </span>
                </p>
            </div>
        )
    }

    const LoginMetamask = () => {
        const fancyFontStyle = {
            fontFamily: 'Lobster, cursive',
            fontWeight: 'bold',
            color: 'black',
            fontSize: '24px', // Adjust the font size as needed
        };

        return (
            <div>
                <p style={fancyFontStyle}>
                    <span style={{ fontWeight: 'bold', fontSize: '24px' }}>Crypto Chess&nbsp;</span>
                </p>
                <a className="global-link" onClick={props.connectTo} style={fancyFontStyle}>
                    Click here to connect
                </a>
            </div>
        );
    };

    return (
        <div className="login">
            <h2>
                {props.isHaveMetamask ?
                    <LoginMetamask /> :
                    <NoMetamask />
                }
            </h2>
        </div>
    )
}
