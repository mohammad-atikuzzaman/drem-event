const Event = require("../models/Event");

// Add new event (admin only)
const addEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to add event" });
  }
};

// Book an event
const bookEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.numberOfSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    event.numberOfSeats -= 1;
    await event.save();

    res.json({ message: "Event booked successfully", event });
  } catch (err) {
    res.status(500).json({ message: "Error booking event" });
  }
};

module.exports = {
  addEvent,
  bookEvent,
};
