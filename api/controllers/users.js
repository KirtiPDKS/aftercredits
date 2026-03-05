const User = require("../models/user");
const Follower = require("../models/follower")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { generateToken } = require("../lib/token");

async function create(req, res) {

  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Email, username and password are required"
      });
    }

const existingUser = await User.findOne({
  $or: [{ email }, { username }]
});

if (existingUser) {
  return res.status(400).json({
    message: "Email or username already in use"
  });
}

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      username,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user_id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // const newToken = generateToken(req.user_id);
    const followersCount = await Follower.countDocuments({
      following_id: req.user_id,
    });

    const followingCount = await Follower.countDocuments({
      follower_id: req.user_id,
    });


    res.status(200).json({user:user, followers:followersCount, following:followingCount});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function updateCurrentUser(req, res) {
  try {
    const updateData = {
      username: req.body.username,
      email: req.body.email,
    };

    if (req.file) {
      updateData.profile_image = `/uploads/${req.file.filename}`;
    }

      const updatedUser = await User.findByIdAndUpdate(
      req.user_id,
      updateData,
      { new: true }
    ).select("-password");
    
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function updateCurrentUserPassword(req, res) {
  try {
    const updatedDetails = await User.findByIdAndUpdate(
      req.user_id,
      {
        password: await bcrypt.hash(req.body.password, saltRounds),
      },
      { new: true }
    );

    if (!updatedDetails) {
      return res.status(403).json({ message: "Not authorised or user not found" });
    }

    res.status(200).json(updatedDetails);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({})
    return res.status(200).json(users)
    
  } catch (error) {
    res.status(400).json({message: "Couldn't get users"})
  }
} 

async function getUserByUsername(req,res) {
  try {
    const username = req.params.username
    const user = await User.findOne({username:username}).select("-password")

    if (!user){
      return res.status(404).json({message:"User doesn't exist. Unable to get user information"})
    }
    const isFollowing = await Follower.exists({follower_id:req.user_id, following_id:user._id})
    const isFollower = await Follower.exists({follower_id:user._id, following_id:req.user_id})

    const followersCount = await Follower.countDocuments({
      following_id: user._id,
    });

    const followingCount = await Follower.countDocuments({
      follower_id: user._id,
    });



    return res.status(200).json({message:"Succesfully got user",user:user, isFollowing:!!isFollowing, 
      isFollower:!!isFollower, followers:followersCount,following:followingCount})
  }

  catch(err){
    console.error(err)
    return res.status(500).json({message:"Server error"})
  }
}

const UsersController = {
  create: create,
  getCurrentUser: getCurrentUser,
  updateCurrentUser: updateCurrentUser,
  updateCurrentUserPassword: updateCurrentUserPassword,
  getAllUsers:getAllUsers,
  getUserByUsername:getUserByUsername,
};

module.exports = UsersController;
