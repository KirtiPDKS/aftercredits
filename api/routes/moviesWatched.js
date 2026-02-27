const express = require("express");
const router = express.Router();

const moviesWatchedController = require('../controllers/moviesWatched')


router.get("/me", moviesWatchedController.getMyWatchedMovies);
router.post("/", moviesWatchedController.createPost);
router.get("/name/:username", moviesWatchedController.getWatchedMovies);
router.post("/:movieId", moviesWatchedController.markAsWatched);
router.delete("/:movieId", moviesWatchedController.removeFromWatched);
module.exports = router;
