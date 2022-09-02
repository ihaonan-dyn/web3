// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Tweets {

    address public owner;
    uint256 private counter;

    constructor() {
        counter = 0;
        owner = msg.sender;
     }

    struct tweet {
        address tweeter;
        uint256 id;
        string tweetTxt;
        string tweetImg;
    }

    event tweetCreated (
        address tweeter,
        uint256 id,
        string tweetTxt,
        string tweetImg
    );

    mapping(uint256 => tweet) tweets;

    function addTweet(
        string memory tweetTxt,
        string memory tweetImg
        ) public payable {
            require(msg.value == (0.1 ether), "Please submit 1 Matic");
            tweet storage newTweet = tweets[counter];
            newTweet.tweetTxt = tweetTxt;
            newTweet.tweetImg = tweetImg;
            newTweet.tweeter = msg.sender;
            newTweet.id = counter;
            emit tweetCreated(
                msg.sender, 
                counter, 
                tweetTxt, 
                tweetImg
            );
            counter++;

            payable(owner).transfer(msg.value);
    }

    function getTweet(uint256 id) public view returns (string memory, string memory, address){
        require(id < counter, "No such Tweet");

        tweet storage t = tweets[id];
        return (t.tweetTxt, t.tweetImg, t.tweeter);
    }
}