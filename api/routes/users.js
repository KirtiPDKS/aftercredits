const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker")

const router = express.Router();

router.post("/", UsersController.create);
router.get('/me', tokenChecker, UsersController.getCurrentUser)
router.get("/all",UsersController.getAllUsers)
router.get("/:username", tokenChecker, UsersController.getUserByUsername)




module.exports = router;
