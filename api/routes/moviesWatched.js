const express = require("express");
const router = express.Router();

const moviesWatchedController = require('../controllers/moviesWatched')

router.get("/:username", moviesWatchedController.getWatchedMovies);
router.post("/", moviesWatchedController.createPost);
router.post("/:movieId", moviesWatchedController.markAsWatched);

module.exports = router;
