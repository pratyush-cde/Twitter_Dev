const { LikeRepository, TweetRepository } = require("../repository/index");

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    let likeable;

    if (modelType === "Tweet") {
      likeable = await this.tweetRepository.get(modelId);

      if (!likeable) {
        throw new Error("Tweet not found");
      }
    } else if (modelType === "Comment") {
      throw new Error("Comment likes are not implemented yet");
    } else {
      throw new Error("Unknown model type");
    }

    const existingLike = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });

    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      await likeable.save();
      await this.likeRepository.destroy(existingLike._id);
      return false;
    }

    const newLike = await this.likeRepository.create({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });

    likeable.likes.push(newLike._id);
    await likeable.save();

    return true;
  }
}

module.exports = LikeService;
