const { TweetService } = require("../services/index");

const tweetService = new TweetService();

const createTweet = async (req, res) => {
  try {
    const response = await tweetService.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Successfully created a tweet",
      err: {},
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      err: error,
      data: {},
    });
  }
};

module.exports = {
  createTweet,
};
