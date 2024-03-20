// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  getAllUsers,
  deleteUserById,
} = require("../Controllers/UserController");

// Register user route
router.post("/register", RegisterUser);

// Login user route
router.post("/login", LoginUser);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser", deleteUserById);

module.exports = router;
