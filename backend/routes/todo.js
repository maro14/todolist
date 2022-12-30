//import { getTodos } from '../controllers/todo'
import { Router} from 'express';

export const TodoRouter =  Router()

TodoRouter.get('/test', async(req, res) => {
    res.send("OK from router")
})

export default TodoRouter