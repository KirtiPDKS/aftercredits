const Follower = require("../models/follower");
const { generateToken } = require("../lib/token");

async function followUser(req,res) {
    try{
    const follower_id = req.user_id
    const following_id = req.params.id 

    const Follow = new Follower({follower_id:follower_id,following_id:following_id})
    await Follow.save();
    return res.status(201).json({message: "successfully followed user"})
    }
    catch(err){
        console.log(err);
        return res.status(401).json({message:"Unable to follow user"})
    }
}

async function unfollowUser(req,res) {
    try{
    const follower_id = req.user_id
    const following_id = req.params.id 

    const unfollow = await Follower.findOneAndDelete({follower_id:follower_id,following_id:following_id})

    return res.status(200).json({message: "successfully unfollowed user"})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"Unable to unfollow user"})
    }
}

async function getCurrentUsersFollowers(req, res) {
try{
    const followers = await Follower.find({following_id:req.user_id}).populate("follower_id");
    const token = generateToken(req.user_id);
    return res.status(200).json({ followers: followers, token: token });
}
catch(err){
    console.log(err)
    return res.status(400).json({message:"Unable to get followers"})
}
}

async function getCurrentUserFollowing(req, res) {
try{
  const following = await Follower.find({follower_id:req.user_id}).populate("following_id");
  return res.status(200).json({ following:following});
}
catch(err){
    console.log(err);
    return res.status(400).json({message:"Unable to get the users following"})
}
}

async function getFollowersById(req,res) {
    try{
        const userId = req.params.id 
        const followers = await Follower.find({following_id:userId}).populate("follower_id");
        return res.status(200).json({message:"Successfully got followers", followers: followers});
        }
    catch(err){
        console.log(err)
        return res.status(400).json({message:`Not able to get followers of ${userID}`})
    }
}

async function getFollowingById(req,res) {
    try{
        const userId = req.params.id 
        const following = await Follower.find({follower_id:userId}).populate("following_id")
        return res.status(200).json({following:following,message:"Successfully got following"})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:`Not able to get following of ${userId}`})
    }
}


const FollowerController = {
    getCurrentUserFollowing: getCurrentUserFollowing,
    getCurrentUsersFollowers: getCurrentUsersFollowers,
    followUser:followUser, 
    unfollowUser:unfollowUser,
    getFollowersById:getFollowersById,
    getFollowingById:getFollowingById,
};

module.exports = FollowerController;
