const { TweetService } = require("../services/index");

const tweetService = new TweetService();
const upload = require("../config/file-upload-S3-config");
const multipleUploader = upload.array("images");
const createTweet = (req, res) => {
  multipleUploader(req, res, async (uploadError) => {
    if (uploadError) {
      console.error("Tweet image upload failed:", uploadError);
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
        err: {
          message: uploadError.message,
          code: uploadError.code,
          statusCode: uploadError.statusCode,
        },
        data: {},
      });
    }

    try {
      const response = await tweetService.create({
        ...req.body,
        userId: req.user.id,
        images: (req.files || []).map((file) => file.location),
      });
      return res.status(201).json({
        success: true,
        message: "Successfully created a tweet",
        err: {},
        data: response,
      });
    } catch (error) {
      console.error("Tweet creation failed:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        err: { message: error.message },
        data: {},
      });
    }
  });
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
