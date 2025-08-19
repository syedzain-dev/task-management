import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes & allow only admin for create/update/delete
router.use(authenticateToken);

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', authorizeRoles('admin'), createCategory);
router.put('/:id', authorizeRoles('admin'), updateCategory);
router.delete('/:id', authorizeRoles('admin'), deleteCategory);

export default router;
