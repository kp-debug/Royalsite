const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Event = require('../models/Event');

// Create upload folders if they do not exist
const flyerFolder = path.join(__dirname, '../uploads/flyers');
const videoFolder = path.join(__dirname, '../uploads/videos');

fs.mkdirSync(flyerFolder, { recursive: true });
fs.mkdirSync(videoFolder, { recursive: true });

// Configure uploaded file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'flyer') {
      cb(null, flyerFolder);
    } else if (file.fieldname === 'video') {
      cb(null, videoFolder);
    } else {
      cb(new Error('Unsupported upload field'));
    }
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + extension);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024
  }
});

// ADD EVENT
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

      return res.status(201).json({
        message: 'Event added successfully',
        event
      });
    } catch (error) {
      console.error('Error adding event:', error);

      return res.status(500).json({
        message: 'Failed to add event'
      });
    }
  }
);

// GET ALL EVENTS
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    return res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);

    return res.status(500).json({
      message: 'Error fetching events'
    });
  }
});

// GET ONE EVENT
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid event ID'
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    return res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
});

// DELETE EVENT — NO TOKEN VERIFICATION
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid event ID'
      });
    }

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    return res.json({
      message: 'Event deleted successfully',
      deletedEventId: req.params.id
    });
  } catch (error) {
    console.error('Error deleting event:', error);

    return res.status(500).json({
      message: 'Error deleting event'
    });
  }
});

module.exports = router;
