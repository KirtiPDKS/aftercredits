const MoviesWatched = require('../models/moviesWatched')
const MoviesToWatch = require('../models/moviesToWatch')
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

async function markAsWatched(req, res) {
  try {
    const movie_id = req.params.movieId;
    const user_id = req.user_id;

    await MoviesToWatch.findOneAndDelete({
      user_id,
      movie_id,
    });

    const watchedMovie = new MoviesWatched({
      user_id,
      movie_id,
    });

    await watchedMovie.save();

    const newToken = generateToken(user_id);
    res.status(200).json({ message: "Marked as watched", token: newToken });

  } catch (error) {
    res.status(400).json({ message: "Error marking as watched" });
  }
}

const moviesWatchedController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  markAsWatched: markAsWatched,
};

module.exports = moviesWatchedController;