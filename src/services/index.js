const TweetService = require("./tweet-service");

module.exports = {
  TweetService,
  UserService: require("./user-service"),
  CommentService: require("./comment-service"),
  LikeService: require("./like-service"),
};
