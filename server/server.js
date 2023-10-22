const express = require('express');
const app = express();
const port = 6000;
const sqlite3 = require('sqlite3').verbose();

// Create a SQLite database connection
const db = new sqlite3.Database('./my_database.db'); // Update with your database file

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
      } else {
        res.json({ message: 'User registered successfully' });
      }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});