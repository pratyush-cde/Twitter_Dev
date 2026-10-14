const express = require("express");
const connect = require("./config/database");
const app = express();

const TweetRepository = require("./repository/tweet-repository");
const Comment = require("./models/comment");
app.listen(3000, async () => {
  console.log("Server Started");
  await connect();
  console.log("mongo db connected");

  const tweetRepo = new TweetRepository();
  const tweet = await tweetRepo.getWithComments("6acf812dc7de9c3591607b98");
  console.log(tweet);
});
