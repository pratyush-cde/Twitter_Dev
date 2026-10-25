const { CommentService } = require("../services/index");

const commentService = new CommentService();

const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment({
      ...req.body,
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      err: {},
      data: comment,
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
  createComment,
};
