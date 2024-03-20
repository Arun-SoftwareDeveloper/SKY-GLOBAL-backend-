// authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

// Middleware for user authentication
const authenticateUser = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ message: "Authentication failed. Token missing." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .send({ message: "Authentication failed. User not found." });
    }

    // Attach the user to the request object for further use
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Authentication failed. Invalid token." });
  }
};

// Middleware for user authorization
const authorizeUser = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({
      message: "Authorization failed. User does not have permission.",
    });
  }
  next();
};

module.exports = { authenticateUser, authorizeUser };
