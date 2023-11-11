// Import necessary modules and styles
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./profile.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import METAMASK from '../../images/METAMASK.png';
import Cookies from "js-cookie";

// Profile component
export default function Profile(props) {
  // useEffect to set the address in a cookie when the component is mounted
  useEffect(() => {
    if (props.address) {
      Cookies.set("userAddress", props.address);
    }
  }, [props.address]);

  // ProfilePage component
  const ProfilePage = () => {
    return (
      <div className="profile-background">
        <div className="profile">
        <GlobalToolBar className="global-toolbar-section" />
          <div className="logo-and-details logo-section">
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

          <div className="logo-container logo-section">
            <img src={METAMASK} alt="logo" height="100%" />
          </div>
        </div>

      
      </div>
    );
  };

  // Render Profile component
  return (
    <div className="center-container">
      {props.isConnected ? (
        <ProfilePage />
      ) : (
        <Navigate to="/EE4032ChessGame/" />
      )}
    </div>
  );
}
