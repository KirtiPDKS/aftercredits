const express = require("express");
const router = express.Router();

const MoviesToWatchController = require('../controllers/moviesToWatch')

router.get("/", MoviesToWatchController.getAllPosts);
router.post("/", MoviesToWatchController.createPost);
router.post("/:movieId", MoviesToWatchController.addToWatchlist);
router.delete("/:movieId", MoviesToWatchController.removeFromWatchlist);

module.exports = router;