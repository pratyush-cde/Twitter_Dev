const TweetService = require("./tweet-service");

module.exports = {
  TweetService,
  CommentService: require("./comment-service"),
  LikeService: require("./like-service"),
};
