const express = require("express");
const {
  register,
  login,
  getUserById,
  changeUserData,
} = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.get("/getUserById", auth, getUserById);
router.put("/updateUser", changeUserData);
module.exports = router;
