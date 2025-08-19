import db from '../config/db.js';


export const createTask = async (req, res) => {
  const { name, category_id } = req.body;
  const userId = req.user.id;

  if (!name) return res.status(400).json({ message: 'Task name is required' });

  try {
    const [result] = await db.query(
      'INSERT INTO tasks (name, category_id, user_id) VALUES (?, ?, ?)',
      [name, category_id || null, userId]
    );

    res.status(201).json({ message: 'Task created', taskId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllTasks = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    let query = `
      SELECT 
        tasks.id, tasks.name, tasks.created_at,
        categories.name AS category,
        users.name AS created_by
      FROM tasks
      LEFT JOIN categories ON tasks.category_id = categories.id
      LEFT JOIN users ON tasks.user_id = users.id
    `;

    let params = [];

    // If not admin, add filter for user's own tasks
    if (userRole !== 'admin') {
      query += ' WHERE tasks.user_id = ?';
      params.push(userId);
    }

    query += ' ORDER BY tasks.created_at DESC';

    const [tasks] = await db.query(query, params);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const [tasks] = await db.query(`
      SELECT 
        tasks.id, tasks.name, tasks.created_at,
        categories.name AS category,
        users.name AS created_by
      FROM tasks
      LEFT JOIN categories ON tasks.category_id = categories.id
      LEFT JOIN users ON tasks.user_id = users.id
      WHERE tasks.id = ?
    `, [taskId]);

    if (!tasks.length) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(tasks[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { name, category_id } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    if (!existing.length) return res.status(404).json({ message: 'Task not found' });

    const updatedData = {};
    if (name) updatedData.name = name;
    if (category_id !== undefined) updatedData.category_id = category_id;

    if (!Object.keys(updatedData).length) {
      return res.status(400).json({ message: 'No data provided for update' });
    }

    await db.query('UPDATE tasks SET ? WHERE id = ?', [updatedData, taskId]);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const [existing] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    if (!existing.length) return res.status(404).json({ message: 'Task not found' });

    await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
