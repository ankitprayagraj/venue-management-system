const mongoose = require('mongoose');

const { Schema } = mongoose;

const Transaction = new Schema({
    price: {
        type: Number,
        required: true
    },
    paymentGateway: {
        type: String,
    },
    pgTrackingId: {
        type: String,
        unique:true
    },
    transactionStatus: {
        type: String,
        enum: ['success', 'failed', 'pending']
    },
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    bookingId: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('transactions', Transaction);