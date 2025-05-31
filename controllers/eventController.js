const Booking = require("../models/Booking");
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
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.numberOfSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    const alreadyBooked = await Booking.findOne({ eventId: event._id, email });
    if (alreadyBooked) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    const booking = new Booking({
      email,
      eventId: event._id,
    });
    await booking.save();

    event.numberOfSeats -= 1;
    await event.save();

    res.json({ message: "Event booked successfully", event });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error booking event", error: err.message });
  }
};

// get featured Events
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
    const categories = await Event.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch categories", error: err.message });
  }
};

const getBookedEvents = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const bookings = await Booking.find({ email }).populate("eventId");

    const bookedEvents = bookings.map((booking) => booking.eventId);
    res.json(bookedEvents);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch booked events", error: err.message });
  }
};

module.exports = {
  addEvent,
  bookEvent,
  getEvents,
  getFeaturedEvents,
  getAllCategories,
  getBookedEvents,
};
