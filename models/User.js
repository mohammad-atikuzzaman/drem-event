const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  photo: String,
  password: String, // assume hashed
  role: { type: String, default: 'user', enum: ['user', 'admin'] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
