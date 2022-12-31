import { Schema, model} from 'mongoose'

const todoSchema = new Schema({
    name: {
        type: String
    }
})

export const Todo = model("todo", todoSchema)