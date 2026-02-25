const MoviesToWatch = require('../models/moviesToWatch')
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const movies = await MoviesToWatch.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ movies: movies, token: token });
}

async function createPost(req, res) {
  const movie = new MoviesToWatch(req.body);
  movie.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Movie created", token: newToken });
}

async function addToWatchlist(req, res) {
  try {
    const movie_id = req.params.movieId; // pass movie id in URL
    const user_id = req.user_id;         // assume auth middleware sets this

    // Check if already in watchlist
    const existing = await MoviesToWatch.findOne({ user_id, movie_id });
    if (existing) {
      const newToken = generateToken(user_id);
      return res.status(400).json({ message: "Movie already in watchlist", token: newToken });
    }

    // Create new entry
    const entry = new MoviesToWatch({ user_id, movie_id });
    await entry.save();

    const newToken = generateToken(user_id);
    res.status(201).json({ message: "Movie added to watchlist", token: newToken });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const MoviesToWatchController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  addToWatchlist: addToWatchlist,
};

module.exports = MoviesToWatchController;