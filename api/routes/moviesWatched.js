const express = require("express");
const router = express.Router();

const moviesWatchedController = require('../controllers/moviesWatched')


router.get("/me", moviesWatchedController.getMyWatchedMovies);

router.post("/", moviesWatchedController.createPost);
router.post("/:movieId", moviesWatchedController.markAsWatched);
router.get("/name/:username", moviesWatchedController.getWatchedMovies);

module.exports = router;
