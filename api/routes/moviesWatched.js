const express = require("express");
const router = express.Router();

const moviesWatchedController = require('../controllers/moviesWatched')

router.get("/:username", moviesWatchedController.getWatchedMovies);
router.get("/me", moviesWatchedController.getWatchedMovies)
router.post("/", moviesWatchedController.createPost);

module.exports = router;
