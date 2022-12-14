import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import { Icon } from "web3uikit";
import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";
const App = () => {
  const { isAuthenticated, Moralis } = useMoralis();
  return (
    <>
      <div className="page">
        <div className="sideBar">
          <Sidebar />
          {isAuthenticated ? (
            <div className="logout"
              onClick={() => {
                Moralis.User.logOut().then(() => {
                  window.location.reload();
                })
              }}>
              Logout
            </div>
          ) : (
            <div className="loginPage">
              <Icon
                fill="#ffffff"
                size={40}
                svg="twitter"
              />
              <ConnectButton />
            </div>)}
        </div>



        {isAuthenticated ? (
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        ) : (
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Profile />} />
              <Route path="/" element={<Settings />} />
            </Routes>
          </div>
        )}




        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export default App;