const User = require("../models/user");

function create(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const user = new User({ email, password, username });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      if (process.env.NODE_ENV !== "test") { // if not in test environment, log the error - it was printing out some v long errors as a result of the test doing what it needed to do (no username / pw is sent)
      console.error(err);
      }
      res.status(400).json({ message: "Something went wrong" });
    });
}

const UsersController = {
  create: create,
};

module.exports = UsersController;
