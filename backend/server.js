import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { setupSwagger } from './swagger.js'

const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())


import TodoRouter from "./routes/todo.js"
app.use('/todo', TodoRouter)


import { mongodbConnect } from './database/mongodb.js'
mongodbConnect()

const PORT = 3001

setupSwagger(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})