const express = require("express");
const router = express.Router();

const moviesWatchedController = require('../controllers/moviesWatched')


router.get("/me", moviesWatchedController.getMyWatchedMovies);
router.post("/", moviesWatchedController.createPost);
router.get("/name/:username", moviesWatchedController.getWatchedMovies);
router.post("/:movieId", moviesWatchedController.markAsWatched);
router.put("/:movieId/review", moviesWatchedController.addOrUpdateReview);
router.delete("/:movieId", moviesWatchedController.removeFromWatched);
router.get("/by-movie/:movieId", moviesWatchedController.getOtherUsersReviews);
module.exports = router;
