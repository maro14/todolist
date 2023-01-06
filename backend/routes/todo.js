import { getTodos, addTodo, getTodo, deleteTodo, updateTodo } from '../controllers/todo.js'
import { Router} from 'express';

export const TodoRouter = Router()

TodoRouter.get('/all', getTodos)
TodoRouter.post('/add', addTodo)
TodoRouter.get('/:id', getTodo)
TodoRouter.delete('/:id', deleteTodo)
TodoRouter.put('/:id', updateTodo)

export default TodoRouter