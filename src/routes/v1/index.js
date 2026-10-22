const express = require("express");

const { createTweet } = require("../../controllers/tweet-controller");
const { toggleLike } = require("../../controllers/like-controller");
const validateToggleLike = require("../../middlewares/validate-toggle-like");

const router = express.Router();

router.post("/tweets", createTweet);
router.post("/likes/toggle", validateToggleLike, toggleLike);

module.exports = router;
