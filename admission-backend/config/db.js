const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file (create one if it doesn't exist)
const dbPath = path.resolve(__dirname, '../admissions.db');

// Create or open the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Create the admission table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS admissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        email TEXT,
        phone TEXT,
        course TEXT,
        address TEXT,
        submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

module.exports = db;
