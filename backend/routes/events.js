const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Event = require('../models/Event');

// Storage for flyer
const flyerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/flyers');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-flyer' + path.extname(file.originalname));
  }
});

// Storage for video
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-video' + path.extname(file.originalname));
  }
});

// Configure upload handler
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'flyer') cb(null, 'uploads/flyers');
      else if (file.fieldname === 'video') cb(null, 'uploads/videos');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
    }
  })
});

// ✅ Add event
router.post('/add', upload.fields([{ name: 'flyer' }, { name: 'video' }]), async (req, res) => {
  try {
    const { title, date, description, fullDetails } = req.body;
    const flyer = req.files.flyer ? '/uploads/flyers/' + req.files.flyer[0].filename : '';
    const video = req.files.video ? '/uploads/videos/' + req.files.video[0].filename : '';

    const event = new Event({ title, date, description, fullDetails, flyer, video });
    await event.save();
    res.status(201).json({ message: 'Event created', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// ✅ Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// ✅ Get single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Delete an event
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;
