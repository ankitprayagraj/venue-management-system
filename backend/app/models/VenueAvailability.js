const mongoose = require('mongoose');
const { Schema } = mongoose;

const status = ['booked', 'blocked'];
const VenueAvailability = new Schema({

    // venueOwnerId: {
    //     type: Schema.ObjectId,
    //     required: true
    // },
    venueId: {
        type: Schema.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: status,
            message: `Invalid Status. eg. ${status.join(', ')}`
        }, // booked status when user booked and block status when venue owner block the date
    },
    bookingDate: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('venueAvailability', VenueAvailability);