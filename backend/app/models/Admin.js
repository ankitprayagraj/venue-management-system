const mongoose = require("mongoose");
const { Schema } = mongoose

const Admin = new Schema({
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
    }
}, { timestamps: true });

module.exports = mongoose.model('admin', Admin);