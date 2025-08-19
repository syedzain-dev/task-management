import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getUser, registerUser, loginUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';


// Define routes for user operations
// Auth routes
router.post('/login', loginUser);         // Login
router.post('/register', registerUser);        // Register (option 1)


// CRUD routes
router.get('/:id', authenticateToken, getUser);              // Get user by ID
router.get('/',authenticateToken, getAllUsers);            // Get all users
router.put('/:id',authenticateToken, updateUser);           // Update user by ID
router.delete('/:id',authenticateToken, deleteUser);        // Delete user by ID



export default router;