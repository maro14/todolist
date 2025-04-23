import { connect } from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()

const mongoUrl = process.env.MONGODB
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10
}

export const mongodbConnect = async() => {
    try {
        await connect(mongoUrl, connectionOptions)
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        // Retry connection after delay
        setTimeout(mongodbConnect, 5000);
    }
}