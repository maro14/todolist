import { Todo } from '../models/todo.js'

export const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json({ data: todos })
    } catch (err) {
        res.status(400).json({ data: err.message })
    }
}

export const getTodo = async(req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)
        todo.complete = !todo.complete
        todo.save()
        res.status(200).json({ data: todo })
    } catch (err) {
        res.status(400).json({ data: err })
    }
}

export const addTodo = async(req, res) => {
    try {
        const { text } = req.body
        const todo = await Todo.create({ text })
        res.status(201).json({ data: todo })
    } catch (err) {
        res.status(400).json({ data: err })
    }
}

export const deleteTodo = async(req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findByIdAndDelete(id)
        res.status(200).json({ data: todo })
    } catch (err) {
        res.status(400).json({data: err })
    }
}

export const updateTodo = async(req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findByIdAndUpdate(id)
        res.status(200).json({ data: todo})
    } catch (err) {
        res.status(400).json({ data: err})
    }
}
