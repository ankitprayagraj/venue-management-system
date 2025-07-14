const express = require('express');
const venueController = require('../controllers/venueController.js');

const router = express.Router();

router.get('/',venueController.getVenues);

module.exports = router;