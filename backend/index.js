const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const connectDB = require('./app/utils/dbConnect.js');
const userRoutes = require('./app/routes/user.routes.js');
const adminRoutes = require('./app/routes/admin.routes.js');
const adminAuthRoutes = require('./app/routes/adminAuth.routes.js');
const venueRoutes = require('./app/routes/venue.routes.js');
const bookingRoutes = require('./app/routes/booking.routes.js');
const venueOwnerAuthRoutes = require('./app/routes/venueOwnerAuth.routes.js');
const venueOwnerRoutes = require('./app/routes/venueOwner.routes.js');

const cors = require('cors');
const verifyUser = require('./app/middlewares/userAuth.js');
const verifyAdmin = require('./app/middlewares/adminAuth.js');
const verifyVenueOwner = require('./app/middlewares/venueOwnerAuth.js');

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || '';

connectDB(MONGODB_URI);

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

/** User Routes */
app.use("/", userRoutes);

/** Admin Routes */
app.use("/admin", adminAuthRoutes);
app.use("/admin", verifyAdmin, adminRoutes);

app.use('/venues', venueRoutes);
app.use("/bookings", verifyUser, bookingRoutes);

/** Venue Owner Routes */
app.use("/venue-owner", venueOwnerAuthRoutes);
app.use("/venue-owner", verifyVenueOwner, venueOwnerRoutes);

app.get('/test', (req, res) => {

    console.log('=====', req.headers['X-Forwarded'])
    return res.status(200).json({
        message: 'all ok',
        // req: JSON.stringify(req)
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});