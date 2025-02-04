import { Todo } from '../models/todo.js'

export const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find()
            .sort({ createdAt: -1 }) // Sort by newest first
            .select('-__v') // Exclude version field
        
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error: Failed to fetch todos'
        })
    }
}

export const getTodo = async(req, res) => {
    try {
        const { id } = req.params
        
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found'
            })
        }

        todo.complete = !todo.complete
        await todo.save()

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
            error: 'Server Error: Failed to update todo'
        })
    }
}

export const addTodo = async(req, res) => {
    try {
        const { text } = req.body
        
        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Todo text is required'
            })
        }

        const todo = await Todo.create({ text })

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

export const updateTodo = async(req, res) => {
    try {
        const { id } = req.params
        const { text } = req.body

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

// Get todos by category
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

// Get todos by priority
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

// Search todos
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

// Get statistics
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
