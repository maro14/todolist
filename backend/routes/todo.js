import { getTodos, addTodo, getTodo } from '../controllers/todo.js'
import { Router} from 'express';

export const TodoRouter = Router()

TodoRouter.get('/all', getTodos)
TodoRouter.post('/add', addTodo)
TodoRouter.get('/:id', getTodo)

export default TodoRouter