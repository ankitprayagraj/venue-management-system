const express = require('express');
const Admin = require('../models/Admin.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

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

            const salt = bcrypt.genSalt(10);

            const hashPassword = await bcrypt.hash(password, 10);

            const userDetails = {
                username,
                email,
                hashPassword
            }

            const user = new Admin(userDetails);

            const userAccount = await user.save();

            const token = jwt.sign({
                id:userAccount._id,
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
                id:user._id,
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
}