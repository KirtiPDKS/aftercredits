const express = require("express");
const router = express.Router();

const MoviesToWatchController = require('../controllers/moviesToWatch')

router.get("/", MoviesToWatchController.getAllPosts);
router.post("/", MoviesToWatchController.createPost);

module.exports = router;