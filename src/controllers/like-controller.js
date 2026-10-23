const { LikeService } = require("../services/index");

const likeService = new LikeService();

const toggleLike = async (req, res) => {
  try {
    const { modelId, modelType, userId } = req.body;
    const isAdded = await likeService.toggleLike(modelId, modelType, userId);

    return res.status(200).json({
      success: true,
      message: isAdded ? "Like added successfully" : "Like removed successfully",
      err: {},
      data: { liked: isAdded },
    });
  } catch (error) {
    const isClientError =
      error.message === "Unknown model type" ||
      error.message === "Tweet not found" ||
      error.message === "Comment not found";

    return res.status(isClientError ? 400 : 500).json({
      success: false,
      message: error.message || "Something went wrong",
      err: error,
      data: {},
    });
  }
};

module.exports = {
  toggleLike,
};
