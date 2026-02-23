const mongoose = require("mongoose");
const User = require("./user");
const Movie = require("./movie"); 

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const MoviesWatchedSchema = new mongoose.Schema({

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  review: String,
  rating: Number,
});

// We use the Schema to create the Movie model. Models are classes which we can
// use to construct entries in our Database.
const MoviesWatched = mongoose.model("MoviesWatched", MoviesWatchedSchema);

// These lines will create a test movie every time the server starts.
// You can delete this once you are creating your own movies.
const dateTimeString = new Date().toLocaleString("en-GB");
// new MoviesWatched({ message: `Test message, created at ${dateTimeString}` }).save();

module.exports = MoviesWatched;