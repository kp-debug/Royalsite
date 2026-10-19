const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Event = require('../models/Event');

// Connect this middleware to your actual admin login/token verification.
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Admin login required'
    });
  }

  // IMPORTANT:
  // Replace this placeholder with verification using the same
  // JWT secret and admin checks as your existing admin login.
  return res.status(401).json({
    message: 'Connect this route to your existing admin token verification'
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'flyer') {
      cb(null, 'uploads/flyers');
    } else if (file.fieldname === 'video') {
      cb(null, 'uploads/videos');
    } else {
      cb(new Error('Unsupported upload field'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname +
      path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post(
  '/add',
  upload.fields([
    { name: 'flyer', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { title, date, description, fullDetails } = req.body;

      if (!title || !date) {
        return res.status(400).json({
          message: 'Title and date are required'
        });
      }

      const flyer = req.files?.flyer?.[0]
        ? '/uploads/flyers/' + req.files.flyer[0].filename
        : '';

      const video = req.files?.video?.[0]
        ? '/uploads/videos/' + req.files.video[0].filename
        : '';

      const event = await Event.create({
        title,
        date,
        description,
        fullDetails,
        flyer,
        video
      });

      res.status(201).json({
        message: 'Event created',
        event
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Failed to create event'
      });
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching events'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;
