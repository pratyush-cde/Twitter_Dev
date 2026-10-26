const express = require("express");

const { createTweet, getTweet } = require("../../controllers/tweet-controller");
const { toggleLike } = require("../../controllers/like-controller");
const { createComment } = require("../../controllers/comment-controller");
const {
  signup,
  login,
  getCurrentUser,
} = require("../../controllers/user-controller");
const validateToggleLike = require("../../middlewares/validate-toggle-like");
const { authenticate } = require("../../middlewares/jwt-middleware");

const router = express.Router();

router.post("/tweets", authenticate, createTweet);
router.post("/users", signup);
router.post("/users/login", login);
router.get("/users/me", authenticate, getCurrentUser);
router.get("/tweets/:id", getTweet);
router.post("/likes/toggle", authenticate, validateToggleLike, toggleLike);
router.post("/comments", authenticate, createComment);

module.exports = router;
