const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

router.get('/', (req, res) => {
  Entry.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Entry.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const newEntry = req.body;
  Entry.create(newEntry, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, ...newEntry });
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedEntry = req.body;
  Entry.update(id, updatedEntry, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, ...updatedEntry });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Entry.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
});

module.exports = router;
