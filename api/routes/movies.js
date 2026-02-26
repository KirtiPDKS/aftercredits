const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/movies");

router.get("/", PostsController.getAllPosts);
router.get("/:id", PostsController.getMovieById);
router.post("/", PostsController.createPost);

module.exports = router;
