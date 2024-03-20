// routes/protectedRoutes.js

const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../Middleware/authMiddleware");

// Protected route - Example for admin only
router.get("/admin/dashboard", authenticateUser, (req, res) => {
  return res.status(200).send({ message: "Welcome to admin dashboard" });
});

module.exports = router;
