const mongoose = require("mongoose");

const FollowerSchema = new mongoose.Schema({
  follower_id: {type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  },
  following_id: {type:mongoose.Types.ObjectId,
    ref:"User", 
    required:true
  },
}, {timestamps:true});


const Follower = mongoose.model("Follower", FollowerSchema);


FollowerSchema.pre('save', function(next) {
  if (this.follower_id.equals(this.following_id)) {
    const err = new mongoose.Error.ValidationError(this);
    err.addError('following_id', new mongoose.Error.ValidatorError({
      message: 'Cannot follow yourself'
    }));

    return next(err);
  }
  next();
});

FollowerSchema.index({ follower_id: 1, following_id: 1 }, { unique: true });


// These lines will create a test movie every time the server starts.
// You can delete this once you are creating your own movies.
const dateTimeString = new Date().toLocaleString("en-GB");

module.exports = Follower;
