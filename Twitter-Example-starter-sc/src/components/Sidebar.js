import React from "react";
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Logo, Icon } from "web3uikit";
import ipfsLogo from "../images/ipfs-logo.png";
import { defaultImgs } from "../defaultimgs";
import { useMoralis } from "react-moralis"
const Sidebar = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  return (
    <>
      <div className="siderContent">
        <div className="menu">
          <div className="details">
            <img src={ipfsLogo} className="profilePic"></img>
            <Icon fill="#000000" size={40} svg="fil" />
            <Logo theme="icon" color="blue" size="regular" />
          </div>

          <Link to="/" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="list" />
              Home
            </div>
          </Link>
          <Link to="/profile" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="user" />
              Profile
            </div>
          </Link>

          <Link to="/settings" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="cog" />
              Settings
            </div>
          </Link>
        </div>
        {isAuthenticated ? (
          <div className="details">
            <img src={Moralis.User.current().attributes.pfp ? Moralis.User.current().attributes.pfp : defaultImgs[0]} className="profilePic"></img>
            <div className="profile">
              <div className="who">
                {Moralis.User.current().attributes.username}
              </div>
              <div className="accWhen">
                {`${Moralis.User.current().attributes.ethAddress.slice(0, 4)}...${Moralis.User.current().attributes.ethAddress.slice(38)}`}
              </div>
            </div>
          </div>
        ) : (
          console.log("!111")
        )}
      </div>
    </>
  );
};

export default Sidebar;