import { getTodos, addTodo } from '../controllers/todo.js'
import { Router} from 'express';

export const TodoRouter = Router()

TodoRouter.get('/all', getTodos)
TodoRouter.post('/add', addTodo)

export default TodoRouter