import { Todo } from '../models/todo.js'

// Get all todos, sorted by creation date (newest first)
export const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find()
            .sort({ createdAt: -1 })
            .select('-__v')
        
        if (!todos || todos.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'No todos found',
                message: 'Please add some todos first'
            })
        }
        
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        })
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch todos',
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        })
    }
}

// Toggle the completion status of a todo by ID
export const getTodo = async(req, res) => {
    try {
        const { id } = req.params
        
        // Validate ID format before query
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid todo ID format',
                message: 'ID must be a 24-character hex string'
            })
        }
        
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found',
                message: `No todo found with ID ${id}`
            })
        }

        // Toggle the complete status
        todo.complete = !todo.complete
        await todo.save()

        res.status(200).json({
            success: true,
            data: todo,
            message: 'Todo status updated successfully'
        })
    } catch (err) {
        console.error('Error updating todo:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid todo ID',
                message: 'The provided ID is not valid'
            })
        }
        res.status(500).json({
            success: false,
            error: 'Failed to update todo',
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        })
    }
}

// Add a new todo
export const addTodo = async(req, res) => {
    try {
        const { text, category = 'other', priority = 'medium' } = req.body
        
        // Validate text input
        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Todo text is required'
            })
        }

        // Create todo with all fields
        const todo = await Todo.create({ 
            text,
            category,
            priority
        })

        res.status(201).json({
            success: true,
            data: todo
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({
                success: false,
                error: messages
            })
        }
        res.status(500).json({
            success: false,
            error: 'Server Error: Failed to create todo'
        })
    }
}

// Delete a todo by ID
export const deleteTodo = async(req, res) => {
    try {
        const { id } = req.params
        
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found'
            })
        }

        await todo.deleteOne()

        res.status(200).json({
            success: true,
            data: todo
        })
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid todo ID'
            })
        }
        res.status(500).json({
            success: false,
            error: 'Server Error: Failed to delete todo'
        })
    }
}

// Update the text of a todo by ID
export const updateTodo = async(req, res) => {
    try {
        const { id } = req.params
        const { text } = req.body

        // Validate text input
        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Todo text is required'
            })
        }

        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found'
            })
        }

        todo.text = text
        await todo.save()

        res.status(200).json({
            success: true,
            data: todo
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({
                success: false,
                error: messages
            })
        }
        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid todo ID'
            })
        }
        res.status(500).json({
            success: false,
            error: 'Server Error: Failed to update todo'
        })
    }
}

// Get todos filtered by category
export const getTodosByCategory = async(req, res) => {
    try {
        const { category } = req.params;
        const todos = await Todo.find({ category })
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error: Failed to fetch todos by category'
        });
    }
};

// Get todos filtered by priority
export const getTodosByPriority = async(req, res) => {
    try {
        const { priority } = req.params;
        const todos = await Todo.find({ priority })
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error: Failed to fetch todos by priority'
        });
    }
};

// Search todos by text using MongoDB text index
export const searchTodos = async(req, res) => {
    try {
        const { query } = req.query;
        const todos = await Todo.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        )
        .sort({ score: { $meta: "textScore" } });
        
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error: Failed to search todos'
        });
    }
};

// Get statistics about todos (total, completed, by category and priority)
export const getTodoStats = async(req, res) => {
    try {
        const stats = await Todo.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    completed: { 
                        $sum: { $cond: ['$complete', 1, 0] }
                    },
                    categoryStats: {
                        $push: '$category'
                    },
                    priorityStats: {
                        $push: '$priority'
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: stats[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error: Failed to get todo statistics'
        });
    }
};
