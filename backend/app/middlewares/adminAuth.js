const Admin = require('../models/Admin.js');
const jwt = require('jsonwebtoken');

async function verifyAdmin(req, res, next) {

    const { token } = req.query;

    if (!token) {
        return res.status(401).json({
            message: 'Admin not authorized.'
        });
    }

    const userToken = jwt.decode(token);

    if (!userToken) {
        return res.status(401).json({
            message: 'Admin not authorized.'
        });
    }
    const user = await Admin.findById(userToken.id);

    if (!user) {
        return res.status(401).json({
            message: 'Admin not found.'
        });
    }
    console.log(user);

    req.user = user;

    next()
}
module.exports = verifyAdmin;