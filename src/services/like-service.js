const {
  LikeRepository,
  TweetRepository,
  CommentRepository,
} = require("../repository/index");

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    let likeable;

    if (modelType === "Tweet") {
      likeable = await this.tweetRepository.get(modelId);
    } else if (modelType === "Comment") {
      likeable = await this.commentRepository.get(modelId);
    } else {
      throw new Error("Unknown model type");
    }

    if (!likeable) {
      throw new Error(`${modelType} not found`);
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
