// routes/bus.js
const express = require('express');
const router = express.Router();
const BusStop = require('../models/buss');

// GET all bus stops
router.get('/', async (req, res) => {
  const stops = await BusStop.find().sort({ time: 1 });
  res.json(stops);
});

// POST new stop
router.post('/', async (req, res) => {
  const { stop, time, wait } = req.body;
  const newStop = new BusStop({ stop, time, wait });
  await newStop.save();
  res.status(201).json({ message: 'Stop added' });
});

// DELETE stop
router.delete('/:id', async (req, res) => {
  await BusStop.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
