const mongoose = require("mongoose");
const { Schema } = mongoose

const bookingStatus = ['booked', 'pending', 'failed', 'cancelled', 'payment-failed']
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
        enum: { values: bookingStatus, message: `{VALUE} is not a valid status. eg. ${bookingStatus.join(', ')}` },
        default: 'pending'
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('venueBookings', Booking);