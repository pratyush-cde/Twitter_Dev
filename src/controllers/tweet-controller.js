const { TweetService } = require("../services/index");

const tweetService = new TweetService();

const createTweet = async (req, res) => {
  try {
    const response = await tweetService.create({
      ...req.body,
      userId: req.user.id,
    });
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

const getTweet = async (req, res) => {
  try {
    const response = await tweetService.getTweet(req.params.id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Tweet not found",
        err: {},
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully retrieved tweet",
      err: {},
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      err: error,
      data: {},
    });
  }
};

module.exports = {
  createTweet,
  getTweet,
};
