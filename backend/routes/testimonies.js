const express = require('express');
const router = express.Router();
const Testimony = require('../models/Testimony');

// POST new testimony
router.post('/', async (req, res) => {
  try {
    const { name, title, content } = req.body;
    const newTestimony = new Testimony({ name, title, content });
    await newTestimony.save();
    res.status(201).json({ message: 'Testimony submitted. Awaiting approval.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET approved testimonies only (for public display)
router.get('/', async (req, res) => {
  try {
    const testimonies = await Testimony.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(testimonies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch testimonies.' });
  }
});

// GET all testimonies (for admin panel)
router.get('/all', async (req, res) => {
  try {
    const all = await Testimony.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'Error getting testimonies.' });
  }
});

// PUT approve or reject a testimony (admin action)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Testimony.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update testimony.' });
  }
});

// DELETE a testimony
router.delete('/:id', async (req, res) => {
  try {
    await Testimony.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete testimony.' });
  }
});

module.exports = router;
