const Movies = require("../models/movies");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const movies = await Movies.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ movies: movies, token: token });
}

async function createPost(req, res) {
  const movie = new Movies(req.body);
  movie.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Movie created", token: newToken });
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
