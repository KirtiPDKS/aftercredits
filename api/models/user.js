const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  profile_image: {type: String, default: ""}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
