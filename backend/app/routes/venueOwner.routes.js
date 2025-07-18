const express = require('express');
const venueOwnerController = require('../controllers/venueOwnerController.js');
const venueController = require('../controllers/venueController.js');
const verifyVenueOwner = require('../middlewares/venueOwnerAuth.js');

const router = express.Router();

router.post('/signup',venueOwnerController.signUp);
router.post('/login',venueOwnerController.login);
router.post('/venues',venueController.addVenue);
router.get('/venues',venueOwnerController.getVenues);
router.patch('/venues/:venueId',venueController.updateVenue);
router.delete('/venues/:venueId',venueController.deleteVenue);
router.patch('/venues/update-available-date/:venueId', venueOwnerController.updateVenueBookingAvailalbleDate);
router.delete('/venues/bookings/:venueId', venueOwnerController.unblockVenueBookingDate);
router.get('/bookings', venueOwnerController.getBookingsByVenueOwnerId);
router.patch('/venues/bookings/status/:bookingId', venueOwnerController.bookingStatusUpdate);

module.exports = router;