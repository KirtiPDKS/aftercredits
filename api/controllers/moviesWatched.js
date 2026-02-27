const MoviesWatched = require('../models/moviesWatched')
const MoviesToWatch = require('../models/moviesToWatch')
const User = require("../models/user")
const { generateToken } = require("../lib/token");

async function getWatchedMovies(req, res) {
  try{
    let userId
  if(req.params.username){
  const username = req.params.username
  const user = await User.findOne({username:username})
  if(!user){
    return res.status(404).json({message:"Not found any user"})
  }
  userId = user._id;
}
else{
  return res.status(400).json({message:"No user defined"})
}
  const movies = await MoviesWatched.find({user_id:userId}).populate("movie_id");
  return res.status(200).json({message:"Successfully got movies",movies:movies})
  }
  catch(error){
    return res.status(500).json({message: "Server error"})
  }
  
}

async function getMyWatchedMovies(req, res) {
  try{
  const movies = await MoviesWatched.find({user_id:req.user_id}).populate("movie_id");
  return res.status(200).json({message:"Successfully got movies",movies:movies})
  }
  catch(error){
    return res.status(500).json({message: "Unable to get movies"})
  }
  
}

async function createPost(req, res) {
  try {
    const { movie_id } = req.body;

    const existing = await MoviesWatched.findOne({
      user_id: req.user_id,
      movie_id,
    });

    if (existing) {
      const newToken = generateToken(req.user_id);
      return res.status(409).json({
        message: "Movie already in watched list",
        token: newToken,
      });
    }

    const movie = new MoviesWatched({
      user_id: req.user_id,
      movie_id,
    });

    await movie.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({
      message: "Movie added to watched list",
      token: newToken,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function markAsWatched(req, res) {
  try {
    const movie_id = req.params.movieId;
    const user_id = req.user_id;

    const alreadyWatched = await MoviesWatched.findOne({
      user_id,
      movie_id,
    });

    if (alreadyWatched) {
      const newToken = generateToken(user_id);
      return res.status(409).json({
        message: "Movie already marked as watched",
        token: newToken,
      });
    }

    // Remove from to-watch if exists
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
    res.status(200).json({
      message: "Marked as watched",
      token: newToken,
    });

  } catch (error) {
    res.status(400).json({ message: "Error marking as watched" });
  }
}

async function removeFromWatched(req, res) {
  try {
    const movie_id = req.params.movieId;
    const user_id = req.user_id;

    const deleted = await MoviesWatched.findOneAndDelete({
      user_id,
      movie_id,
    });

    if (!deleted) {
      const newToken = generateToken(user_id);
      return res.status(404).json({
        message: "Movie not in watched list",
        token: newToken,
      });
    }

    const newToken = generateToken(user_id);
    res.status(200).json({
      message: "Movie removed from watched list",
      token: newToken,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const moviesWatchedController = {
  getWatchedMovies: getWatchedMovies,
  createPost: createPost,
  markAsWatched: markAsWatched,
  getMyWatchedMovies:getMyWatchedMovies,
  removeFromWatched: removeFromWatched,
};

module.exports = moviesWatchedController;