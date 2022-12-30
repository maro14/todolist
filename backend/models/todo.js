import { Schema, model} from 'mongoose'

const todoSchema = new Schema({
    name: {
        type: String
    },
    
    timestamps: true
    
})

export default Todo = model("todo", todoSchema)