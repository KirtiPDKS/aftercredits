// const MoviesWatched = require('../models/moviesWatched')
// const { generateToken } = require("../lib/token");
// const User = require('../models/user');

// async function getWatchedMovies(req, res) {
//   try{
//     let userId
//   if(req.params.username){
//   const username = req.params.username
//   const user = await User.findOne({username:username})
//   if(!user){
//     return res.status(404).json({message:"Not found any user"})
//   }
//   userId = user._id;
// }
// else if (req.user_id){
//   userId = req.user_id
// }
// else{
//   return res.status(400).json({message:"No user defined"})
// }

//   const movies = await MoviesWatched.find({user_id:userId});
//   return res.status(200).json({message:"Successfully got movies",movies:movies})
//   }
//   catch(error){
//     return res.status(500).json({message: "Server error"})
//   }
  
// }

// async function createPost(req, res) {
//   const movie = new MoviesWatched(req.body);
//   movie.save();

//   const newToken = generateToken(req.user_id);
//   res.status(201).json({ message: "Movie created", token: newToken });
// }

// const moviesWatchedController = {
//   getWatchedMovies: getWatchedMovies,
//   createPost: createPost,
// };

// module.exports = moviesWatchedController;