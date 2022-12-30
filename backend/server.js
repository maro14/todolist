import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())


import TodoRouter from "./routes/todo"
app.use('/todo', TodoRouter)

app.get('/', async(req, res) => {
    res.send("OK")
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
})