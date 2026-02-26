const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/all",UsersController.getAllUsers)
router.get("/:username", UsersController.getUserByUsername)

module.exports = router;
