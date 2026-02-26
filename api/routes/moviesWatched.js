const express = require("express");
const router = express.Router();

const moviesWatchedController = require('../controllers/moviesWatched')

router.get("/", moviesWatchedController.getAllPosts);
router.post("/", moviesWatchedController.createPost);
router.post("/:movieId", moviesWatchedController.markAsWatched);
router.delete("/:movieId", moviesWatchedController.removeFromWatched);

module.exports = router;
