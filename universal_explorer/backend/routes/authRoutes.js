const express = require('express');
const router = express.Router();
const { 
    registerSystemAdmin,
    loginSystemAdmin,
    registerUser,
    loginUser 
} = require('../controllers/authController');

// System Admin authentication
router.post('/registerSystemAdmin', registerSystemAdmin);
router.post('/loginSystemAdmin', loginSystemAdmin);

// User authentication
router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);

module.exports = router;
