const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    noOfSit: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
