// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   eventName: String,
//   date: Date,
//   location: String,
//   category: String,
//   description: String,
//   numberOfSeats: Number,
//   imageLink: String
// }, { timestamps: true });

// module.exports = mongoose.model('Event', eventSchema);

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    numberOfSeats: { type: Number, required: true, min: 1 },
    imageLink: { type: String, required: true },

    // New fields based on your description:
    organizer: {
      name: { type: String, required: true },
      contact: { type: String, required: true }, // Can be email/phone/etc.
    },
    registrationDeadline: { type: Date, required: true },
    registrationFee: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
