const Admin = require('../models/Admin.js');
const VenueOwner = require('../models/VenueOwner.js');
const Venue = require('../models/Venue.js');
const Booking = require('../models/Booking.js');
const VenueAvailability = require('../models/VenueAvailability.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { ObjectId } = require('mongodb');

const { JWT_TOKEN_SECRET } = process.env;

module.exports = {
    signUp: async (req, res) => {
        try {

            if (typeof req.body !== "object") {
                return res.status(400).json({
                    message: 'Please enter a valid details.'
                });
            }

            const { username, password, email } = req.body;

            if (!username || typeof username !== 'string') {
                return res.status(400).json({
                    message: 'Please enter a valid name.'
                });
            }
            else if (!email || typeof email !== 'string') {
                return res.status(400).json({
                    message: 'Please enter a valid email.'
                });
            }
            else if (!password || typeof password !== 'string') {
                return res.status(400).json({
                    message: 'Please enter a valid password.'
                });
            }

            const userExist = await Admin.findOne({ email: String(email) });

            if (userExist) {
                return res.status(409).json({
                    message: 'Admin is already exist.'
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const userDetails = {
                username,
                email,
                hashPassword
            }

            const user = new Admin(userDetails);

            const userAccount = await user.save();

            const token = jwt.sign({
                id: userAccount._id,
                email,
            },
                JWT_TOKEN_SECRET, {
                expiresIn: "1m",
            })

            return res.status(200).json({
                token,
                message: 'Account created.'
            });

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    },
    login: async (req, res) => {
        try {

            if (typeof req.body !== "object") {
                return res.status(400).json({
                    message: 'Please enter a valid details.'
                });
            }

            const { password, email } = req.body;

            if (!email || typeof email !== 'string') {
                return res.status(400).json({
                    message: 'Please enter a valid email.'
                });
            }
            else if (!password || typeof password !== 'string') {
                return res.status(400).json({
                    message: 'Please enter a valid password.'
                });
            }

            const searchEmail = String(email);

            const user = await Admin.findOne({ email: searchEmail });

            if (!user) {
                return res.status(401).json({
                    message: 'Admin not found.'
                });
            }

            const isVerified = await bcrypt.compare(password, user.hashPassword);

            if (!isVerified) {
                return res.status(401).json({
                    message: 'Password not match.'
                });
            }

            const token = jwt.sign({
                id: user._id,
                email: user.email,
            },
                JWT_TOKEN_SECRET, {
                expiresIn: "1m",
            })

            return res.status(200).json({
                token,
                message: 'Account created.'
            });

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    },
    updateVenue: async (req, res) => {
        try {

            if (typeof req.body !== "object") {
                return res.status(400).json({
                    message: 'Please enter a valid details.'
                });
            }

            const { venueName, description, location, capacity, amenities, price } = req.body;

            const { venueId } = req.params;

            if (!ObjectId.isValid(venueId)) {
                return res.status(400).json({
                    message: 'Invalid venueId.'
                });
            }

            if (!venueName || !description || !capacity || !amenities) {
                return res.status(400).json({
                    message: 'Please enter valid details.'
                });
            }
            else if (!price || typeof price !== 'number' || price <= 0) {
                return res.status(400).json({
                    message: 'Please enter a valid price.'
                });
            }
            else if (!location || typeof location !== 'object') {
                return res.status(400).json({
                    message: 'Please enter a valid location.'
                });
            }

            const venue = await Venue.findByIdAndUpdate({
                _id: ObjectId.createFromHexString(venueId),
            },
                {
                    venueName, description, location, capacity, amenities, price,
                }, {

            });

            if (!venue) {
                return res.status(404).json({
                    message: 'Venue not found.'
                });
            }
            return res.status(200).json({
                message: 'Venue updated.'
            });

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    },
    venueOwnerAccountStatusUpdate: async (req, res) => {
        try {

            const { venueOwnerId } = req.params;
            const { accountStatus } = req.body;

            if (typeof venueOwnerId !== "string" && !ObjectId.isValid(venueOwnerId)) {
                return res.status(400).json({
                    message: 'Invalid venue owner ID.'
                });
            }

            // const userExist = await VenueOwner.findOne({ _id: ObjectId.createFromHexString(venueOwnerId) });

            if (typeof accountStatus !== 'string') {
                return res.status(400).json({
                    message: 'Invalid account status.'
                });
            }

            console.log(venueOwnerId, accountStatus);
            try {
                const updatedStatus = await VenueOwner.updateOne(
                    { _id: ObjectId.createFromHexString(venueOwnerId) },
                    { $set: { accountStatus: accountStatus } },
                    { runValidators: true }
                );
                console.log(updatedStatus);

                return res.status(200).json({
                    updatedStatus,
                    message: 'Account Status updated.'
                });
            } catch (e) {

                if (e.name === 'ValidationError') {
                    return res.status(400).json({
                        message: 'Invalid account status.'
                    });
                }

                return res.status(500).json({
                    message: 'Internal server error.'
                });
            }

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    },
    getBookings: async (req, res) => {
        try {

            const { page, pageSize } = req.query;

            const userId = req.user._id;

            const limit = parseInt(pageSize) || 10;

            const pageNumber = parseInt(page) || 1;

            const skip = (pageNumber - 1) * limit;

            const venues = await Booking.aggregate([
                { $lookup: { from: 'venues', localField: 'venueId', foreignField: '_id', as: 'venue' } },
                {
                    $unwind: "$venue"
                },
                {
                    $project: {
                        _id: 1,
                        venueId: 1,
                        userId: 1,
                        bookingDate: 1,
                        transactionId: 1,
                        bookingStatus: 1,
                        price: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        venueName: "$venue.venueName",
                        description: "$venue.description",
                        location: "$venue.location",
                        capacity: "$venue.capacity",
                        amenities: "$venue.amenities",
                    }
                }
                // {
                //     $skip: skip
                // },
                // { $limit: limit }
            ]);

            const totalCount = await Booking.countDocuments({ userId: userId });

            const data = {
                totalCount,
                pageNumber,
                pageSize: limit,
                bookings: venues || []
            }
            return res.status(200).json({
                data,
                message: 'retrived successfully.'
            });

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    },
    bookingStatusUpdate: async (req, res) => {
        try {

            const { bookingId } = req.params;
            const { bookingStatus } = req.body;

            if (typeof bookingId !== "string" && !ObjectId.isValid(bookingId)) {
                return res.status(400).json({
                    message: 'Invalid booking ID.'
                });
            }

            if (typeof bookingStatus !== 'string') {
                return res.status(400).json({
                    message: 'Invalid booking status.'
                });
            }

            const updatedStatus = await Booking.updateOne(
                { _id: ObjectId.createFromHexString(bookingId) },
                { $set: { bookingStatus: bookingStatus } },
                { runValidators: true }
            );

            if (updatedStatus.matchedCount === 0) {
                return res.status(404).json({
                    message: 'Booking not found.'
                });
            }

            return res.status(200).json({
                message: 'Booking status updated.'
            });

        }
        catch (e) {
            console.log(e)

            if (e.name === 'ValidationError') {
                const errorMessage = e.errors?.bookingStatus?.message || 'Invalid booking status.';
                return res.status(400).json({
                    message: errorMessage
                });
            }
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    },
    updateVenueBookingAvailalbleDate: async (req, res) => {
        try {

            const { venueId } = req.params;
            const { bookingDate, status } = req.body;

            function isValidDateString(dateString) {
                const date = Date.parse(dateString);
                return !isNaN(date);
            }

            if (typeof venueId !== 'string' && !ObjectId.isValid(venueId)) {

                return res.status(400).json({
                    message: 'Invalid venueId'
                })
            }

            if (typeof bookingDate !== 'string' || !isValidDateString(bookingDate)) {
                return res.status(400).json({
                    message: 'Invalid available date'
                });
            }

            const isBookingExist = await VenueAvailability.findOne({
                venueId: ObjectId.createFromHexString(venueId),
                bookingDate
            });

            if (isBookingExist) {

                /** Don't block venue if booked on that date */
                if (isBookingExist.status === 'booked') {
                    return res.status(409).json({
                        message: `Venue date cannot be blocked. Venue is already booked on that date.`
                    })
                }

                /** accept the block date request if date is not booked */
                isBookingExist.status = status;

                await isBookingExist.save();

                return res.status(200).json({
                    message: 'Venue blocked Updated',
                    isBookingExist
                });

            }

            const updatedBooking = new VenueAvailability({
                venueId: ObjectId.createFromHexString(venueId),
                bookingDate,
                status
            });

            await updatedBooking.save();

            return res.status(200).json({
                message: 'Venue block Updated',
                updatedBooking
            });

        } catch (e) {

            if (e.name === 'ValidationError' && e.errors?.status?.message) {

                const errorMessage = e.errors?.status?.message || 'Validation error.'
                return res.status(500).json({
                    message: errorMessage
                })

            }
            console.log(e)
            return res.status(500).json({
                message: 'Internal server error.'
            })
        }
    },
    unblockVenueBookingDate: async (req, res) => {
        try {

            const { venueId } = req.params;
            const { bookingDate } = req.body;

            function isValidDateString(dateString) {
                const date = Date.parse(dateString);
                return !isNaN(date);
            }

            if (typeof venueId !== 'string' && !ObjectId.isValid(venueId)) {

                return res.status(400).json({
                    message: 'Invalid venueId'
                })
            }

            if (typeof bookingDate !== 'string' || !isValidDateString(bookingDate)) {
                return res.status(400).json({
                    message: 'Invalid available date'
                });
            }

            const updatedBooking = await VenueAvailability.findOne({
                venueId: ObjectId.createFromHexString(venueId),
                bookingDate,
            });

            if (!updatedBooking) {
                return res.status(404).json({
                    message: 'Venue not found.'
                })
            }
            else if (updatedBooking.status === 'booked') {
                return res.status(409).json({
                    message: 'Venue date cannot be delete. Venue is already booked.'
                });
            }
            else if (updatedBooking.status === 'blocked') {

                return res.status(409).json({
                    message: 'Venue date cannot be delete. Venue is already booked.'
                });
            }

        } catch (e) {

            if (e.name === 'ValidationError' && e.errors?.status?.message) {

                const errorMessage = e.errors?.status?.message || 'Validation error.'
                return res.status(500).json({
                    message: errorMessage
                })

            }

            return res.status(500).json({
                message: 'Internal server error.'
            })
        }
    }
}