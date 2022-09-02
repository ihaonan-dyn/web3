import React from "react";
import "./Home.css";
import { useState, useRef} from "react";
import { defaultImgs } from "../defaultimgs";
import {TextArea, Icon} from "web3uikit";
import TweetInFeed from "../components/TweetInFeed";
import {useMoralis,useWeb3ExecuteFunction} from "react-moralis"
import Tweets from "../contractABIs/Tweets.json"
const Home = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();
  const {Moralis} =useMoralis()
  const contractProcessor =useWeb3ExecuteFunction();
  const user =Moralis.User.current();
  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  async function saveTweet() {
    if(!tweet) return;
    const Tweets =Moralis.Object.extend("Tweets")
    const newTweet= new Tweets();
    newTweet.set("tweetTxt",tweet)
    newTweet.set("tweeterPfp",user.attributes.pfp)
    newTweet.set("tweeterAcc",user.attributes.ethAddress)
    newTweet.set("tweeterUserName",user.attributes.username)
    if(theFile){
      const data=theFile;
      const file=new Moralis.File(data.name,data);
      await file.saveIPFS();
     newTweet.set("tweetImg",file.ipfs());
    }
    await newTweet.save();
    window.location.reload();
  }

  async function maticTweet() {
    if(!tweet) return;
    let img;
    if(theFile){
      const data =theFile;
      const file =new Moralis.File(data.name,data);
      await file.saveIPFS();
      img =file.ipfs();
    }else {
      img="no img";
    }
    console.log(77777777777);
    console.log(img)
    console.log(tweet)
    let options = {
      contractAddress :"0xFcee26Fff5c8af28E1e7469fD89B6b16e1448c2D",
      functionName:"addTweet",
      abi:Tweets.abi,
      params:{
        tweetTxt:tweet,
        tweetImg: img,
      },
      msgValue:Moralis.Units.ETH(0.1)
    }
    contractProcessor.fetch({
      params:options,
      onSuccess:()=>{
        saveTweet();
      },
      onError:(error)=>{
        console.log("111111111");
        console.log(error);
      }
    })
    



  }

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <img 
            src={user.attributes.pfp?user.attributes.pfp: defaultImgs[0]} className="profilePic" >
          </img>

          <div className="tweetBox">
            <TextArea
              label=""
              placeholder="Type here field"
              name="tweetTextArea"
              onBlur={function noRefCheck(){}}
              type="text"
              width="95%"
              onChange={(e) => setTweet(e.target.value)}>
            </TextArea>
            {selectedFile && (
              <img src={selectedFile} className="tweetImg"></img>
            )}

            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
                <input
                    type="file"
                    name="file"
                    ref={inputFile}
                    onChange={changeHandler}
                    style={{ display: "none"}}
                  />
                  <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
              </div>

              <div className="tweetOptions">
                <div className="tweet" onClick={saveTweet}>Tweet</div>
                  <div className="tweet" onClick={maticTweet} style={{ backgroundColor: "#8247e5" }}>
                    <Icon fill="#ffffff" size={20} svg="matic" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <TweetInFeed profile={false}/>
      </div>
    </>
  );
};

export default Home;