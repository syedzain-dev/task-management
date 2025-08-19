import db from '../config/db.js';

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Category name is required' });

  try {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Category created', categoryId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllCategories = async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const [categories] = await db.query('SELECT * FROM categories WHERE id = ?', [categoryId]);
    if (!categories.length) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(categories[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Category name is required' });

  try {
    const [result] = await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, categoryId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [categoryId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
