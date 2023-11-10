import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./profile.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import METAMASK from '../../images/METAMASK.png';
import Cookies from "js-cookie";

export default function Profile(props) {
  // useEffect to set the address in a cookie when the component is mounted
  useEffect(() => {
    if (props.address) {
      Cookies.set("userAddress", props.address);
    }
  }, [props.address]);

  const ProfilePage = () => {
    return (
      <div className="profile-background">
        <div className="profile">
          <div className="logo-and-details">
            <img src={METAMASK} alt="logo" height="100%" />
            <div className="profile-account">
              <p>
                <b>Profile details</b>
              </p>
              <hr color="black" />
              <p>
                Address:&nbsp;
                <span className="global-message">{props.address}</span>
                <br />
                Network:&nbsp;
                <span className="global-message">{props.networkType}</span>
                <br />
                Balance:&nbsp;
                <span className="global-message">{props.balance}</span>
                &nbsp;ETH
              </p>
            </div>
          </div>
        </div>

        <GlobalToolBar />
      </div>
    );
  };

  return (
    <div>
      {props.isConnected ? (
        <ProfilePage />
      ) : (
        <Navigate to="/EE4032ChessGame/" />
      )}
    </div>
  );
}
