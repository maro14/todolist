import { getTodos, addTodo, getTodo, deleteTodo, updateTodo } from '../controllers/todo.js'
import { Router} from 'express';

export const TodoRouter = Router()

TodoRouter.get('/all', getTodos)
TodoRouter.post('/add', addTodo)
TodoRouter.get('/complete/:id', getTodo)
TodoRouter.delete('/delete/:id', deleteTodo)
TodoRouter.put('/update/:id', updateTodo)

export default TodoRouter