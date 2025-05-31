const express = require('express');
const { register } = require('../controllers/authController');
const router = express.Router();


// You should protect this with your authentication middleware
 
// router.post('/register', (req, res)=>{
//     console.log(req.body)
// });

 router.post('/register', register)

module.exports = router;