const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const { body, validationResult } = require('express-validator');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'linux',
  database: 'diario_personal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware de validación para los campos title y content
const validateEntry = [
  body('title').notEmpty().withMessage('El título no puede estar vacío').trim(),
  body('content').notEmpty().withMessage('El contenido no puede estar vacío').trim(),
];

// Ruta POST para crear una nueva entrada en el diario
router.post('/entries', validateEntry, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO entries (title, content) VALUES (?, ?)', [title, content]);
    connection.release();
    res.status(201).json({ id: result.insertId, title, content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta PUT para actualizar una entrada del diario por ID
router.put('/entries/:id', validateEntry, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const entryId = req.params.id;
  const { title, content } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('UPDATE entries SET title = ?, content = ? WHERE id = ?', [title, content, entryId]);
    connection.release();
    if (result.affectedRows > 0) {
      res.json({ id: entryId, title, content });
    } else {
      res.status(404).json({ message: 'Entrada no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta DELETE para eliminar una entrada del diario por ID
router.delete('/entries/:id', async (req, res) => {
  const entryId = req.params.id;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM entries WHERE id = ?', [entryId]);
    connection.release();
    if (result.affectedRows > 0) {
      res.json({ message: 'Entrada eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Entrada no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { connection: pool, router };
