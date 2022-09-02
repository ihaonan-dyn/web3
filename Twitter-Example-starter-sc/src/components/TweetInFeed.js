import React,{useEffect,useState} from "react";
import "./TweetInFeed.css";
import filecoinOrbit from "../images/filecoinOrbit.jpeg";
import canoe from "../images/canoe.jpeg";
import { defaultImgs } from "../defaultimgs";
import pfp4 from "../images/pfp4.png";
import pfp5 from "../images/pfp5.png";
import { Icon } from "web3uikit";
import {useMoralis} from "react-moralis";
const TweetInFeed = (profile) => {
  const {Moralis,account} =useMoralis();
  const [tweetAtr, setTweetAtr] = useState();
  useEffect(() => {
   async function getTweets(){
    try{
      const Tweets=Moralis.Object.extend("Tweets");
      const  query=new Moralis.Query(Tweets)
        if(profile.profile){
          query.equalTo("tweetAcc",account);
        }
        const results=await query.find();
        setTweetAtr(results);
    }catch(error){
      console.log(error);
    }
   }
   getTweets();
  }, [profile])
  return (
    <>
    {tweetAtr?.map((e)=>{
      return(
      <div className="feedTweet">
        <img src={e.attributes.tweeterPfp?e.attributes.tweeterPfp: defaultImgs[0]} className="profilePic"></img>
        {/* <img src={user.attributes.pfp?user.attributes.pfp: defaultImgs[0]} className="profilePic"></img> */}
        <div className="completeTweet">
          <div className="who">
            {e.attributes.tweeterUserName.slice(0,10)}
            <div className="accWhen">
              {`${e.attributes.tweeterAcc.slice(0,4)}...${e.attributes.tweeterAcc.slice(38)} 
              ${e.attributes.createdAt.toLocaleString('en-us',{month:'short'})}
              ${e.attributes.createdAt.toLocaleString('en-us',{day:'numeric'})}
              `}
            </div>
          </div>
          <div className="tweetContent">
            {
              e.attributes.tweetTxt
            }
            {
               e.attributes.tweetImg&&(
                <img src={e.attributes.tweetImg} className="tweetImg"></img>
               )
            }
            
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
              12
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div>);
    }).reverse()
    }
    </>
  );
};

export default TweetInFeed;