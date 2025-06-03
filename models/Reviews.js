const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    userPhoto: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
