const Admin = require('../models/Admin.js');
const VenueOwner = require('../models/VenueOwner.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { ObjectId } = require('mongodb');

const { JWT_TOKEN_SECRET } = process.env;

module.exports = {
  assistAdmin: async (req, res) => {}
}