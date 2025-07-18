const express = require('express');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Booking = require('../models/Booking.js');
const VenueAvailablity = require('../models/VenueAvailability.js');

const { ObjectId } = require('mongoose').Types;

const { JWT_TOKEN_SECRET } = process.env;

module.exports = {
    bookingVenue: async (req, res) => {
        try {

            if (typeof req.body !== "object") {
                return res.status(400).json({
                    message: 'Please enter a valid details.'
                });
            }

            const { venueId, userId, bookingDate, transactionId, price } = req.body;

            if (!venueId, !userId, !bookingDate, !transactionId) {
                return res.status(400).json({
                    message: 'Please enter valid details.'
                });
            }
            else if (!price || typeof price !== 'number' || price <= 0) {
                return res.status(400).json({
                    message: 'Please enter a valid price.'
                });
            }

            const defaultBookingStatus = "booked";

            const checkBookingDate = new Date(bookingDate);
            checkBookingDate.setUTCHours(0, 0, 0, 0);

            const endOfDay = new Date(checkBookingDate);
            endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);


            const isVenueBooked = await VenueAvailablity.findOne({
                venueId: ObjectId.createFromHexString(venueId),
                bookingDate: {
                    $gte: checkBookingDate,
                    $lt: endOfDay
                }
            });

            if (isVenueBooked) {
                return res.status(409).json({
                    message: 'Venue date is already booked.'
                });
            }

            const newBooking = new Booking({ venueId, userId, bookingDate: checkBookingDate, transactionId, bookingStatus: defaultBookingStatus, price });

            await newBooking.save();

            const updateVenueDate = new VenueAvailablity({
                bookingDate: checkBookingDate,
                bookingId: newBooking._id,
                status: "booked",
                venueId: newBooking.venueId
            });

            await updateVenueDate.save();

            return res.status(200).json({
                message: 'New Booking added.'
            });

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    },
    updateBooking: async (req, res) => {
        try {

            if (typeof req.body !== "object") {
                return res.status(400).json({
                    message: 'Please enter a valid details.'
                });
            }

            const { venueName, description, location, capacity, amenities, price, venueOwnerId } = req.body;

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

            const venue = await Booking.findByIdAndUpdate({ _id: ObjectId.createFromHexString(venueId) },
                {
                    venueName, description, location, capacity, amenities, price,
                }, {

            });

            if (!venue) {
                return res.status(404).json({
                    message: 'Booking not found.'
                });
            }
            return res.status(200).json({
                message: 'Booking updated.'
            });

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

            const userId = ObjectId.createFromHexString(String(req.user._id));

            const limit = parseInt(pageSize) || 10;

            const pageNumber = parseInt(page) || 1;

            const skip = (pageNumber - 1) * limit;

            const venues = await Booking.aggregate([
                {
                    $match: {
                        userId: userId
                    }
                },
                {
                    $skip: skip
                },
                { $limit: limit }
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
    deleteBooking: async (req, res) => {
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

            const user = await User.findOne({ email: searchEmail });

            if (!user) {
                return res.status(401).json({
                    message: 'User not found.'
                });
            }

            const isVerified = await bcrypt.compare(password, user.hashPassword);

            if (!isVerified) {
                return res.status(401).json({
                    message: 'Password not match.'
                });
            }

            const token = jwt.sign({
                username: user,
                email: email.user,
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
}