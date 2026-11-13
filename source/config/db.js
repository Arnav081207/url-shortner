import mongoose from 'mongoose';
import config from './config.js';

async function connectdb() {
    try {
        await mongoose.connect(config.mongo_url);
        console.log("Arnav DB is connected");
    } catch (err) {
        console.error("Error connecting to DB:", err);
        process.exit(1);
    }
}

export default connectdb;