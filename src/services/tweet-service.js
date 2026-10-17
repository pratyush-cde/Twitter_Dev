const { TweetRepository, HashtagRepository } = require("../repository/index");

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hastagRepository = new HashtagRepository();
  }

  async create(data) {
    const content = data.content;

    const tags = [
      ...new Set(
        (content.match(/#[a-zA-Z0-9_-]+/g) || []).map((tag) =>
          tag.substring(1).toLowerCase(),
        ),
      ),
    ];

    const tweet = await this.tweetRepository.create(data);

    const alreadyPresentTags =
      (await this.hastagRepository.findByName(tags)) || [];

    const existingTitles = alreadyPresentTags.map((tag) => tag.title);

    const newTags = tags
      .filter((tag) => !existingTitles.includes(tag))
      .map((tag) => ({
        title: tag,
        tweets: [tweet._id],
      }));

    let createdTags = [];

    if (newTags.length > 0) {
      createdTags = (await this.hastagRepository.bulkCreate(newTags)) || [];
    }

    for (const tag of alreadyPresentTags) {
      tag.tweets.push(tweet._id);
      await tag.save();
    }

    const allTags = [...alreadyPresentTags, ...createdTags];

    for (const tag of allTags) {
      tweet.hashTags.push(tag._id);
    }

    await tweet.save();

    return tweet;
  }
}

module.exports = TweetService;
