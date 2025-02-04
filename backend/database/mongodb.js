import { connect } from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()

const mongoUrl = process.env.MONGODB

export const mongodbConnect = async(req, res) => {
    try {
        await connect(mongoUrl)
        console.log('MongoDB connected');
    } catch (err) {
        console.error("MongoDB error:", err.message);
    }
}