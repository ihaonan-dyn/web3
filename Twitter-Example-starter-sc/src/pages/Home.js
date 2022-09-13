import React from "react";
import "./Home.css";
import { useState, useRef } from "react";
import { defaultImgs } from "../defaultimgs";
import { TextArea, Icon } from "web3uikit";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis, useWeb3ExecuteFunction} from "react-moralis";
import Tweets from "../contractABIs/Tweets.json";
import Faucet from "../contractABIs/Faucet.json";
const Home = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();
  const { isAuthenticated, Moralis ,account} = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction();
  // const user =Moralis.User.current();
  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  async function saveTweet() {
    if (!tweet) return;
    const Tweets = Moralis.Object.extend("Tweets")
    const newTweet = new Tweets();
    newTweet.set("tweetTxt", tweet)
    newTweet.set("tweeterPfp", Moralis.User.current().attributes.pfp)
    newTweet.set("tweeterAcc", Moralis.User.current().attributes.ethAddress)
    newTweet.set("tweeterUserName", Moralis.User.current().attributes.username)
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }
    await newTweet.save();
    window.location.reload();
  }

  async function maticTweet() {
    if (!tweet) return;
    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    } else {
      img = "no img";
    }
    console.log(77777777777);
    console.log(img)
    console.log(tweet)
    let options = {
      contractAddress: "0xFcee26Fff5c8af28E1e7469fD89B6b16e1448c2D",
      functionName: "addTweet",
      abi: Tweets.abi,
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(0.1)
    }
    contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        postTransferToken();
        saveTweet();
      },
      onError: (error) => {
        console.log("111111111");
        console.log(error);
      }
    })
  }
  //发帖奖励一代币
  async function postTransferToken() {
    let options = {
      contractAddress: "0x58aD35aA4D8F6f9822a4d61A925e81F811579F76",
      functionName: "requestTokens",
      abi: Faucet.abi,
      params: {
      },
    }
    contractProcessor.fetch({
      params: options,
      onSuccess: () => {
      },
      onError: (error) => {
        console.log(account);
        console.log(error);
      }
    })
  }
  return (
      <>
        <div className="pageIdentify">Home</div>
        <div className="mainContent">
          <div className="profileTweet">
            {isAuthenticated ? (
                <img
                    src={Moralis.User.current().attributes.pfp ? Moralis.User.current().attributes.pfp : defaultImgs[0]} className="profilePic" >
                </img>
            ) : (
                <img
                    src="	https://ipfs.moralis.io:2053/ipfs/QmNgA9MNWFfRaoKzBt21VghQopnKXBgVxzyGvv5qjsV4Vw/media/1" className="profilePic" >
                </img>
            )}
            <div className="tweetBox">
              <TextArea
                  label=""
                  placeholder="Type here field"
                  name="tweetTextArea"
                  onBlur={function noRefCheck() { }}
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
                      style={{ display: "none" }}
                  />
                  <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
                </div>
                {isAuthenticated ? (
                    <div className="tweetOptions">
                      <div className="tweet" onClick={saveTweet}>Tweet</div>
                      <div className="tweet" onClick={maticTweet} style={{ backgroundColor: "#8247e5" }}>
                        <Icon fill="#ffffff" size={20} svg="matic" />
                      </div>
                    </div>
                ) : (
                    console.log("111")
                )}

              </div>
            </div>
          </div>
          <TweetInFeed profile={false} />
        </div>
      </>
  );
};

export default Home;