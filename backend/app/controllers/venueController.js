const express = require('express');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Venue = require('../models/Venue.js');
const { ObjectId } = require('mongoose').Types;

const { JWT_TOKEN_SECRET } = process.env;

module.exports = {
    addVenue: async (req, res) => {
        try {

            if (typeof req.body !== "object") {
                return res.status(400).json({
                    message: 'Please enter a valid details.'
                });
            }

            const { venueName, description, location, capacity, amenities, price } = req.body;
            const venueOwnerId = req.user._id;

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

            const newVenue = new Venue({ venueName, description, location, capacity, amenities, price: price, venueOwnerId: venueOwnerId });

            await newVenue.save();

            return res.status(200).json({
                message: 'New Venue added.'
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

            const venue = await Venue.findByIdAndUpdate({ _id: ObjectId.createFromHexString(venueId), 
                // venueOwnerId:ObjectId.createFromHexString(req.user._id) 
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
    getVenues: async (req, res) => {
        try {

            const { page, pageSize } = req.query;

            /* Pagination */

            // const limit = parseInt(pageSize) || 10;
            // const pageNumber = parseInt(page) || 1;
            // const skip = (pageNumber - 1) * limit;

            const venueQuery = [{$match:{}}];

            // if(page){
            //     venueQuery.push(        {
            //         $skip: skip
            //     },
            //     { $limit: limit })
            //     console.log("=====",venueQuery)
            // }

            const venues = await Venue.aggregate(venueQuery);
            const totalCount = await Venue.countDocuments();

            const data = {
                totalCount,
                // pageNumber,
                // pageSize: limit,
                venues: venues || []
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
    deleteVenue: async (req, res) => {
        try {

            const { venueId } = req.params;

            if (!venueId || !ObjectId.isValid(venueId)) {
                return res.status(400).json({
                    message: 'Invalid venueId'
                });
            }

         const venue = await Venue.findByIdAndDelete(venueId);
console.log(venue);
            if (!venue) {
                return res.status(401).json({
                    message: 'Venue not found.'
                });
            }

            return res.status(200).json({
                message: 'Venue deleted successfully.'
            });

        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Internal server error.'
            });
        }
    },
}