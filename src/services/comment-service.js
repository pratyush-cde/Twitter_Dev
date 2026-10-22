const { CommentRepository, TweetRepository } = require("../repository/index");

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  async createComment(data) {
    const { content, userId, modelId, modelType } = data;

    let commentable;

    if (modelType === "Tweet") {
      commentable = await this.tweetRepository.get(modelId);
    } else if (modelType === "Comment") {
      commentable = await this.commentRepository.get(modelId);
    } else {
      throw new Error("Unknown model type");
    }

    if (!commentable) {
      throw new Error(`${modelType} not found`);
    }

    const comment = await this.commentRepository.create({
      content,
      userId,
      onModel: modelType,
      commentable: modelId,
      comments: [],
    });

    commentable.comments.push(comment);
    await commentable.save();

    return comment;
  }
}

module.exports = CommentService;
