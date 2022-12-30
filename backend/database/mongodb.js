import { connect } from 'mongoose'

export const mongodbConnect = async(req, res) => {

    const uri = ""
    try {
        const connected = await connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        res.send(connected)
        console.log('Mongodb connected');

    } catch (err) {
        console.error("MOngodb error" ,err.message);
    }
}