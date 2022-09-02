import React from "react";
import './Sidebar.css';
import {Link} from 'react-router-dom';
import {Logo, Icon} from "web3uikit";
import ipfsLogo from "../images/ipfs-logo.png";
import { defaultImgs } from "../defaultimgs";
import {useMoralis} from "react-moralis"
const Sidebar = () => {
  const {Moralis}= useMoralis();
  const user=Moralis.User.current();

  return (
    <>
     <div className="siderContent">
      <div className="menu">
        <div className="details">
          <img src={ipfsLogo} className="profilePic"></img>
          <Icon fill="#000000" size={40} svg="fil"/>
          <Logo theme="icon" color="blue" size="regular"/> 
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

      <div className="details">
          <img src={user.attributes.pfp?user.attributes.pfp: defaultImgs[0]} className="profilePic"></img>
          <div className="profile">
            <div className="who">
            {user.attributes.username}
            </div>
            <div className="accWhen">
            {`${user.attributes.ethAddress.slice(0,4)}...${user.attributes.ethAddress.slice(38)}`}
            </div>
          </div>
      </div>

     </div>
    </>
  );
};

export default Sidebar;