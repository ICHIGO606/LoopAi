// db/index.js

const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/Ingestion`);
        console.log(`MongoDB connected successfully: DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("error: ", error);
        process.exit(1);
    }
};

module.exports = connectDB;
