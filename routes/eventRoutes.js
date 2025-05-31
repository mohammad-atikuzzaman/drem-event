const express = require('express');
const router = express.Router();
const { addEvent, bookEvent } = require('../controllers/eventController');
const authorizeAdmin = require('../middleware/authorizeAdmin');

// Add event (admin only)
router.post('/add', addEvent);

// Book an event (any user)
router.post('/book/:id', bookEvent);

module.exports = router;
