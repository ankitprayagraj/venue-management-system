const express = require('express');
const venueOwnerController = require('../controllers/venueOwnerController.js');

const router = express.Router();

router.post('/signup',venueOwnerController.signUp);
router.post('/login',venueOwnerController.login);

module.exports = router;