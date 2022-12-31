import { connect } from 'mongoose'

export const mongodbConnect = async(req, res) => {

    const uri = "mongodb://localhost:27017/todo"
    try {
        await connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongodb connected');

    } catch (err) {
        console.error("MOngodb error" ,err.message);
    }
}