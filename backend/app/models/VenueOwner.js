const mongoose = require("mongoose");
const { Schema } = mongoose

const VenueOwner = new Schema({
    username: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: "Email address is required."
    },
    accountStatus: {
        type: String,
        required: true,
        enum: { values: ["active", 'pending', 'block'], message: props => `${props.value} is not a valid account status!` },
        default: "active",
    }
}, { timestamps: true });

module.exports = mongoose.model('venueOwner', VenueOwner);