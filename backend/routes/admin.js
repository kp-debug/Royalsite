const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// List of allowed admins
const admins = [
  { username: 'admin1', password: 'pass1' },
]

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const match = admins.find(admin => admin.username === username && admin.password === password);

  if (match) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
