const User = require("../models/User");

// Get all of the users info
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

const getAdmin = async (req, res) => {
  try {
    const { emailId } = req.query
    const admin = await User.findOne({ email: emailId });
    res.json(admin.role);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

// Update user info
const updateUser = async (req, res) => {
  const userId = req.user?.id || req.userId;
  const { name, photo } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, photo },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
};

module.exports = {
  updateUser,
  getUsers,
  getAdmin
};
