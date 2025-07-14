const mongoose = require('mongoose');

async function connectDB(databaseURI) {

    try {
        const connection = await mongoose.connect(databaseURI);
        console.log( `Database connected: ${databaseURI}`)

    } catch (e) {
        throw new Error("unable to connect with database.")
    }

}

module.exports = connectDB;