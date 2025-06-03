const Reviews = require("../models/Reviews");

const submitReview = async (req, res) => {
  const { eventId, userEmail, userName, userPhoto, rating, reviewText } =
    req.body;
  const data = { eventId, userEmail, userName, userPhoto, rating, reviewText };
  //   return console.log(data);

  if (!eventId || !userEmail || !rating) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Optional: prevent duplicate reviews by same user for the same event
    const alreadyReviewed = await Reviews.findOne({ eventId, userEmail });
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You already reviewed this event" });
    }

    const newReview = new Reviews({
      eventId,
      userEmail,
      userName,
      userPhoto,
      rating,
      reviewText,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review submitted successfully", newReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find().sort({ createdAt: -1 }).limit(10); // Sort newest first
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

module.exports = {
  submitReview,
  getAllReviews,
};
