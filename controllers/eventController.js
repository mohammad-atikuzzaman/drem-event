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

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
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

// getTopEvents

const getFeaturedEvents = async (req, res) => {
  try {
    const topEvents = await Event.find()
      .sort({ createdAt: -1 }) // Newest first
      .limit(3); // Get top 3
    res.status(200).json(topEvents);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch top events", error: err.message });
  }
};


// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Event.distinct('category');
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories", error: err.message });
  }
};


module.exports = {
  addEvent,
  bookEvent,
  getEvents,
  getFeaturedEvents,
  getAllCategories
};
