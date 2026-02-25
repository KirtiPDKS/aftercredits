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

async function getMovieById(req, res) {
  try {
    const movie = await Movies.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const token = generateToken(req.user_id);

    res.status(200).json({ movie: movie, token: token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getMovieById: getMovieById,
};

module.exports = PostsController;
