const express = require('express');
const adminController = require('../controllers/adminController.js');
const venueController = require('../controllers/venueController.js');

const router = express.Router();

router.post('/venues',venueController.addVenue);
router.patch('/venues/:venueId',venueController.updateVenue);
router.delete('/venues/:venueId',venueController.deleteVenue);

module.exports = router;