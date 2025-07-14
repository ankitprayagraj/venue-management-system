const mongoose = require("mongoose");
const { Schema } = mongoose

const Booking = new Schema({
    venueId: {
        type: Schema.ObjectId,
        required: true
    },
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    transactionId: {
        type: Schema.ObjectId,
        require: true
    },
    bookingStatus: {
        type: String,
        enum: ['booked', 'pending', 'failed', 'cancelled', 'payment-failed'],
        default: 'pending'
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('venueBookings', Booking);