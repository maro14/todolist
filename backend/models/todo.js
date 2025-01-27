import { Schema, model} from 'mongoose'

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamps: {
        type: String,
        default: Date.now()
    }
})

export const Todo = model("todo", todoSchema)