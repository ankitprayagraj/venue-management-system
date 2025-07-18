const express = require('express');
const adminController = require('../controllers/adminController.js');
const venueController = require('../controllers/venueController.js');
const bookingController = require('../controllers/bookingController.js');
const venueOwnerController = require('../controllers/venueOwnerController.js');

const router = express.Router();

router.get('/venues',venueController.getVenues);
router.patch('/venues/:venueId',venueController.updateVenue);
router.delete('/venues/:venueId',venueController.deleteVenue);
router.get('/bookings', adminController.getBookings);
router.patch('/venue-owner/account-status/:venueOwnerId', adminController.venueOwnerAccountStatusUpdate);
router.patch('/venues/bookings/status/:bookingId', adminController.bookingStatusUpdate);
router.patch('/venues/update-available-date/:venueId', adminController.updateVenueBookingAvailalbleDate);
router.delete('/venues/bookings/:venueId', adminController.unblockVenueBookingDate);

module.exports = router;