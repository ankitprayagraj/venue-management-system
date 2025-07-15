const express = require('express');
const adminController = require('../controllers/adminController.js');
const venueController = require('../controllers/venueController.js');
const bookingController = require('../controllers/bookingController.js');

const router = express.Router();

router.post('/venues',venueController.addVenue);
router.get('/venues',venueController.getVenues);
router.patch('/venues/:venueId',venueController.updateVenue);
router.delete('/venues/:venueId',venueController.deleteVenue);
router.get('/bookings', bookingController.getBookingsByAdminId);

module.exports = router;