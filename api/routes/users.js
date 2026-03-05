const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const UsersController = require("../controllers/users");
const FollowerController = require("../controllers/followers")
const tokenChecker = require("../middleware/tokenChecker")

const router = express.Router();

router.post("/", UsersController.create);
router.get('/me', tokenChecker, UsersController.getCurrentUser)
router.put("/me", tokenChecker, upload.single("profile_image"), UsersController.updateCurrentUser);
router.put("/me/password", tokenChecker, UsersController.updateCurrentUserPassword);
router.get("/all",UsersController.getAllUsers)
router.get("/:username", tokenChecker, UsersController.getUserByUsername)

//Followers routes
router.get("/me/followers", tokenChecker, FollowerController.getCurrentUsersFollowers);
router.get("/me/following", tokenChecker, FollowerController.getCurrentUserFollowing);
router.post('/:id/follow', tokenChecker, FollowerController.followUser)
router.delete('/:id/unfollow', tokenChecker, FollowerController.unfollowUser)
router.get('/:id/followers',tokenChecker, FollowerController.getFollowersById)
router.get('/:id/following',tokenChecker, FollowerController.getFollowingById)



module.exports = router;
