import express from 'express';
import {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken); 

router.get('/', getAllTasks);
router.get('/:id', getTask);
router.post('/new', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
