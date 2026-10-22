const validateToggleLike = (req, res, next) => {
  const { modelId, modelType, userId } = req.body || {};

  if (!modelId || !modelType || !userId) {
    return res.status(400).json({
      success: false,
      message: "modelId, modelType, and userId are required",
      err: {},
      data: {},
    });
  }

  next();
};

module.exports = validateToggleLike;
