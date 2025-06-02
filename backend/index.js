const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// SQLite setup
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'admin123')");
  db.run("INSERT INTO users (username, password) VALUES ('user', 'user123')");
   db.run("INSERT INTO users (username, password) VALUES ('sanjay', 'sanjay123')");
  // Insecure login route (vulnerable to SQL injection)
app.post('/insecure-login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error' });
    if (rows.length > 0) return res.json({ message: 'Logged in as ' + rows[0].username });
    res.status(401).json({ message: 'Login failed' });
  });
});
});


app.post('/insecure-login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received:', username, password);  // <== Add this
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
});


// Secure login route (parameterized)
app.post('/secure-login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.all(query, [username, password], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error' });
    if (rows.length > 0) return res.json({ message: 'Logged in as ' + rows[0].username });
    res.status(401).json({ message: 'Login failed' });
  });
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
