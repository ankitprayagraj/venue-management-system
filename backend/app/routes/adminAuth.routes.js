const express = require('express');
const adminController = require('../controllers/adminController.js');

const router = express.Router();

router.post('/signup',adminController.signUp);
router.post('/login',adminController.login);

module.exports = router;