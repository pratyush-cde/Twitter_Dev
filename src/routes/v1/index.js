const express = require("express");

const { createTweet, getTweet } = require("../../controllers/tweet-controller");
const { toggleLike } = require("../../controllers/like-controller");
const { createComment } = require("../../controllers/comment-controller");
const { signup } = require("../../controllers/user-controller");
const validateToggleLike = require("../../middlewares/validate-toggle-like");

const router = express.Router();

router.post("/tweets", createTweet);
router.post("/users", signup);
router.get("/tweets/:id", getTweet);
router.post("/likes/toggle", validateToggleLike, toggleLike);
router.post("/comments", createComment);

module.exports = router;
