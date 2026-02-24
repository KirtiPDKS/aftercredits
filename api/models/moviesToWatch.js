const mongoose = require("mongoose");
const User = require("./user");
const Movie = require("./movies"); 


// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const MoviesToWatchSchema = new mongoose.Schema({

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
});

// We use the Schema to create the Movie model. Models are classes which we can
// use to construct entries in our Database.
const MoviesToWatch = mongoose.model("MoviesToWatch", MoviesToWatchSchema);

// These lines will create a test movie every time the server starts.
// You can delete this once you are creating your own movies.
const dateTimeString = new Date().toLocaleString("en-GB");
// new MoviesToWatch({ message: `Test message, created at ${dateTimeString}` }).save();

module.exports = MoviesToWatch;