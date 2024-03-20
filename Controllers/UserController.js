// controllers/UserController.js

const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).send({ message: `User already exists` });
    }

    if (password !== confirmPassword) {
      return res.status(401).send({ message: `Password does not match` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(402).send({ message: `User not found` });
    }

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.status(403).send({ message: `Incorrect Password` });
    }

    const secretKey = "arunramasamy46"; // Make sure to use a secure secret key in production
    const token = jwt.sign({ userId: existingUser._id }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(202).send(token);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    return res.send(Users);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Extract the user ID from the request parameters
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.send(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { RegisterUser, LoginUser, getAllUsers, deleteUserById };
