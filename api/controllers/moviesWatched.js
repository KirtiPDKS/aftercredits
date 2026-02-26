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
else if (req.user_id){
  userId = req.user_id
}
else{
  return res.status(400).json({message:"No user defined"})
}

  const movies = await MoviesWatched.find({user_id:userId});
  return res.status(200).json({message:"Successfully got movies",movies:movies})
  }
  catch(error){
    return res.status(500).json({message: "Server error"})
  }
  
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
  getWatchedMovies: getWatchedMovies,
  createPost: createPost,
  markAsWatched: markAsWatched,
};

module.exports = moviesWatchedController;