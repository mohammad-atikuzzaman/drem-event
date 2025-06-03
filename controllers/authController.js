const bcrypt = require("bcryptjs");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, photo } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already registered with this email." });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      photo,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  register,
};
