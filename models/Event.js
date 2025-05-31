const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: String,
  date: Date,
  location: String,
  category: String,
  description: String,
  numberOfSeats: Number,
  imageLink: String
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
