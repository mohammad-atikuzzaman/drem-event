const express = require("express");
const router = express.Router();
const {
  addEvent,
  bookEvent,
  getEvents,
  getAllCategories,
  getFeaturedEvents,
} = require("../controllers/eventController");
const authorizeAdmin = require("../middleware/authorizeAdmin");

// Add event (admin only)
router.post("/add", addEvent);

// get all events
router.get("/all", getEvents);

// get all events categories
router.get("/categories", getAllCategories);

// get top 3 events
router.get("/featured", getFeaturedEvents);

// Book an event (any user)
router.post("/book/:id", bookEvent);

module.exports = router;
