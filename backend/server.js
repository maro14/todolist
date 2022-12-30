import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(morgan("dev"))


import { TodoRouter } from "./routes/todo";
app.use('/todo', TodoRouter)

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
})