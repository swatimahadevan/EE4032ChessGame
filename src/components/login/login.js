import './login.css';
import '../../global.css';

export default function Login(props) {

    const NoMetamask = () => {
        return (
            <div>
                <p>
                    <span style={{ fontWeight: 'bold', color: 'white' }}>
                        No MetaMask detected.
                        <br></br>
                        Please install&nbsp;
                    </span>
                    <span className="login-highlight" style={{ fontWeight: 'bold', color: 'white' }}>
                        METAMASK
                    </span>
                    <span style={{ fontWeight: 'bold', color: 'white' }}>
                        &nbsp;to your browser to proceed.
                    </span>
                </p>
            </div>
        )
    }

    const LoginMetamask = () => {
        const fancyFontStyle = {
            fontFamily: 'Merienda One, cursive',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '24px', // Adjust the font size as needed
        };

        return (
            <div>
                <p style={fancyFontStyle}>
                    <span style={{ fontWeight: 'bold', fontSize: '24px' }}>Crypto Chess&nbsp;</span>
                </p>
                <a className="global-link" onClick={props.connectTo} style={{...fancyFontStyle, cursor: 'pointer'}}>
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
