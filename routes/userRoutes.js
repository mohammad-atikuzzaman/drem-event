const express = require("express");
const router = express.Router();
const { updateUser, getUsers } = require("../controllers/userController");

// You should protect this with your authentication middleware
router.get("/all", getUsers)
router.put('/update', updateUser);

module.exports = router;
