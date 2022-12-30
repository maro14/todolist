import Todo from '../models/todo.js'

const getTodos = async(req, res) => {
    try {
        const todos = Todo.find({})
        res.status(200).json({ data: todos })
    } catch (err) {
        res.status(400).json({ data: err.message })
    }
}

export default { getTodos }