const MoviesWatched = require('../models/moviesWatched')
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const movies = await MoviesWatched.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ movies: movies, token: token });
}

async function createPost(req, res) {
    const movie = new MoviesWatched({
      ...req.body, //unpacks everything that arrives from the JSON stringify on front-end
      user_id: req.user_id, 
    });
  await movie.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Movie added to watched list", token: newToken });
}

const moviesWatchedController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = moviesWatchedController;