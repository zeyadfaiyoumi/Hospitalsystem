const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profilecontrollers");
const Auth = require("../middlewares/authMiddleware");
router.get("/Profile", Auth, ProfileController.getAllUsers);
router.post("/editProfile", Auth, ProfileController.editUser);

module.exports = router;
