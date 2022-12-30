import { getTodos } from '../controllers/todo'
import { Router } from 'express';

export const TodoRouter = Router()

TodoRouter.get('/all', getTodos)