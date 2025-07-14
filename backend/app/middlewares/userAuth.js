const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

async function verifyUser(req, res, next) {

    const { token } = req.query;

    if (!token) {
        return res.status(401).json({
            message: 'User not authorized.'
        });
    }

    const userToken = jwt.decode(token);

    if (!userToken) {
        return res.status(401).json({
            message: 'User not authorized.'
        });
    }
    const user = await User.findById(userToken.id);

    if (!user) {
        return res.status(401).json({
            message: 'User not found.'
        });
    }
    req.user = user;

    next()
}
module.exports = verifyUser;