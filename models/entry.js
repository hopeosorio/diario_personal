const db = require('./db');

const Entry = {
  getAll: (callback) => {
    const query = 'SELECT * FROM entries';
    db.query(query, callback);
  },
  getById: (id, callback) => {
    const query = 'SELECT * FROM entries WHERE id = ?';
    db.query(query, [id], callback);
  },
  create: (entry, callback) => {
    const query = 'INSERT INTO entries (title, content) VALUES (?, ?)';
    db.query(query, [entry.title, entry.content], callback);
  },
  update: (id, entry, callback) => {
    const query = 'UPDATE entries SET title = ?, content = ? WHERE id = ?';
    db.query(query, [entry.title, entry.content, id], callback);
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM entries WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Entry;
