
const express = require('express');
const {registerUser, getProfile} = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/profile', getProfile);


module.exports = router;

