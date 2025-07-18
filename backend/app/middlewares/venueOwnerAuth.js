const VenueOwner = require('../models/VenueOwner.js');
const jwt = require('jsonwebtoken');

async function verifyVenueOwner(req, res, next) {

    const { token } = req.query;

    if (!token) {
        return res.status(401).json({
            message: 'Venue owner not authorized.'
        });
    }

    const userToken = jwt.decode(token);

    if (!userToken) {
        return res.status(401).json({
            message: 'Venue owner not authorized.'
        });
    }
    const user = await VenueOwner.findById(userToken.id);

    if (!user) {
        return res.status(401).json({
            message: 'Venue owner not found.'
        });
    }

    req.user = user;

    next()
}
module.exports = verifyVenueOwner;