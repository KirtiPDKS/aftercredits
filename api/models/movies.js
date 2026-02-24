const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  release_year: Number,
  description: String,
  image: String,
});

// We use the Schema to create the Movie model. Models are classes which we can
// use to construct entries in our Database.
const Movie = mongoose.model("Movie", MovieSchema);

// These lines will create a test movie every time the server starts.
// You can delete this once you are creating your own movies.
const dateTimeString = new Date().toLocaleString("en-GB");
// new Movie({ message: `Test message, created at ${dateTimeString}` }).save();

module.exports = Movie;
