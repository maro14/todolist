import { connect } from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()

const mongoUrl = process.env.MONGODB

export const mongodbConnect = async(req, res) => {

    try {
        await connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongodb connected');

    } catch (err) {
        console.error("MOngodb error" ,err.message);
    }
}