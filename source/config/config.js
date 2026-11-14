import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_URL) {
    console.error("No proper Mongo URL");
}

const config = {
    mongo_url: process.env.MONGO_URL,
    port: process.env.PORT 
};

export default config;