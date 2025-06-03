const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");

// Add new event (admin only)
const addEvent = async (req, res) => {
  try {
    const { userD, ...eventData } = req.body;

    const user = await User.findOne({ email: userD });
    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Only Admin Access" });
    }

    const event = new Event(eventData);
    await event.save();

    return res.status(201).json(event);
  } catch (err) {
    console.error("Add Event Error:", err);
    return res.status(500).json({ message: "Failed to add event" });
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

// get a single event dynamical
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch event", error: error.message });
  }
};

// Book an event
const bookEvent = async (req, res) => {
  try {
    const { email, noOfSit, phone, name } = req.body;

    if (!email || !phone || !noOfSit) {
      return res
        .status(400)
        .json({ message: "Email, phone, and number of seats are required" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.numberOfSeats < noOfSit) {
      return res
        .status(400)
        .json({ message: `Only ${event.numberOfSeats} seat(s) available` });
    }

    const alreadyBooked = await Booking.findOne({ eventId: event._id, email });
    if (alreadyBooked) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    const booking = new Booking({
      email,
      phone,
      noOfSit,
      name,
      eventId: event._id,
    });
    await booking.save();

    event.numberOfSeats -= noOfSit;
    await event.save();

    res.json({ message: "Event booked successfully", booking });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error booking event", error: err.message });
  }
};

// cancel booking
const cancelBooking = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    // Check if the booking exists
    const booking = await Booking.findOne({ eventId, email });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Delete the booking
    await Booking.deleteOne({ _id: booking._id });

    // Increase available seats in the event
    await Event.findByIdAndUpdate(eventId, { $inc: { numberOfSeats: 1 } });

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error cancelling booking", error: err.message });
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

// get the booked event of user
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
  getEventById,
  cancelBooking,
};
