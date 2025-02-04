import express from 'express';
import {
    getTodos,
    getTodo,
    addTodo,
    deleteTodo,
    updateTodo,
    getTodosByCategory,
    getTodosByPriority,
    searchTodos,
    getTodoStats
} from '../controllers/todo.js';

const router = express.Router();

// Existing routes
router.get('/all', getTodos);
router.get('/complete/:id', getTodo);
router.post('/add', addTodo);
router.delete('/delete/:id', deleteTodo);
router.put('/update/:id', updateTodo);

// New routes
router.get('/category/:category', getTodosByCategory);
router.get('/priority/:priority', getTodosByPriority);
router.get('/search', searchTodos);
router.get('/stats', getTodoStats);

export default router;