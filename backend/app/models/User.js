const mongoose = require("mongoose");
const { Schema } = mongoose

const User = new Schema({
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
        unique:true,
        index:true,
        required: "Email address is required."
    },
    accountStatus: {
        type: String,
        required: true,
        enum: ["active", 'pending', 'block'],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model('users', User);