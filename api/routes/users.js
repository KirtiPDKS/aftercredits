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
const tokenChecker = require("../middleware/tokenChecker")

const router = express.Router();

router.post("/", UsersController.create);
router.get('/me', tokenChecker, UsersController.getCurrentUser)
router.put("/me", tokenChecker, upload.single("profile_image"), UsersController.updateCurrentUser);
router.put("/me/password", tokenChecker, UsersController.updateCurrentUserPassword);
router.get("/all",UsersController.getAllUsers)
router.get("/:username", tokenChecker, UsersController.getUserByUsername)




module.exports = router;
