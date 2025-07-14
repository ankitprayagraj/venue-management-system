const mongoose = require('mongoose');
const { Schema } = mongoose;

const Venue = new Schema({
    venueName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        address: {
            type: String,
            trim: true
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        pincode: {
            type: Number
        }
    },
    capacity: {
        type: Number,
        min: 0
    },
    amenities: [{
        type: String,
        trim: true
    }],
    venueOwnerId: {
        type: Schema.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['live', 'pending'],
        default: "live"
    },
    price: {
        type: Number,
        min: 0
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('venue', Venue);