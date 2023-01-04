import { Todo } from '../models/todo.js'

export const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json({ data: todos })
    } catch (err) {
        res.status(400).json({ data: err.message })
    }
}

export const addTodo = async(req, res) => {
    try {
        const { name } = req.body
        const todo = await Todo.create({ name })
        res.status(201).json({ data: todo })
    } catch (err) {
        res.status(400).json({ data: err })
    }
}

