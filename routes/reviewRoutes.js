const express = require("express");
const { submitReview, getAllReviews } = require("../controllers/reviewController");
const router = express.Router();

router.post("/submit", submitReview);
router.get("/all-reviews", getAllReviews)

module.exports = router;
