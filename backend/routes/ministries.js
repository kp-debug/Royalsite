const express = require('express');
const router = express.Router();
const Ministry = require('../models/Ministry');

// Submit ministry sign-up
router.post('/', async (req, res) => {
  try {
    const newSignup = new Ministry(req.body);
    await newSignup.save();
    res.status(201).json({ message: 'Ministry sign-up saved' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving form' });
  }
});

// Admin: Get all sign-ups
router.get('/', async (req, res) => {
  try {
    const signups = await Ministry.find().sort({ createdAt: -1 });
    res.json(signups);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching signups' });
  }
});

module.exports = router;
