const User = require("../models/user");
const { generateToken } = require("../lib/token");
const bcrypt = require('bcrypt');


async function createToken(req, res) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({$or: [{username: username },{email: email}]});
  if (!user) {
    console.log("Auth Error: User not found");
    return res.status(401).json({ message: "User not found" });
  }
  const hashedPasswordMatches = await bcrypt.compare(password, user.password);
  if (!hashedPasswordMatches) {
    console.log("Auth Error: Passwords do not match");
    res.status(401).json({ message: "Password incorrect" });
  } else {
    const token = generateToken(user.id);
    res.status(201).json({ token: token, message: "OK" });
  }
}

const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;
