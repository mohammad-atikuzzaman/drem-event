const express = require("express");
const router = express.Router();
const { updateUser, getUsers, getAdmin } = require("../controllers/userController");

// You should protect this with your authentication middleware
router.get("/all", getUsers)
router.get("/isadmin", getAdmin)
router.put('/update', updateUser);

module.exports = router;
