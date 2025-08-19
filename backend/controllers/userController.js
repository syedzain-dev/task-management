import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/authMiddleware.js';
import db from '../config/db.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0)
      return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, password: hashedPassword };

    const [result] = await db.query('INSERT INTO users SET ?', userData);
    userData.id = result.insertId;

    // Generate token
    const token = generateToken(userData);

    // Set token in cookie
    res.cookie('token', token, {
        httpOnly: true,
        });

    res.status(201).json({
      message: 'User registered successfully',
      user: userData,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) 
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) 
      return res.status(400).json({ message: 'Invalid credentials' });

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    // Set token in cookie
    res.cookie('token', token, {
        httpOnly: true,
        });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email FROM users');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get user by ID
export const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const [users] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [userId]);
    if (users.length === 0) 
      return res.status(404).json({ message: 'User not found' });

    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (users.length === 0) 
      return res.status(404).json({ message: 'User not found' });

    // Prepare update data
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    if (Object.keys(updatedData).length === 0) 
      return res.status(400).json({ message: 'No data provided to update' });

    await db.query('UPDATE users SET ? WHERE id = ?', [updatedData, userId]);

    res.status(200).json({ message: `User with ID ${userId} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (users.length === 0) 
      return res.status(404).json({ message: 'User not found' });

    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
