const express = require('express');
const router = express.Router();
const Sermon = require('../models/Sermon');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

/**
 * @route   POST /api/sermons/upload
 * @desc    Upload sermon file
 */
router.post('/upload', upload.single('sermonFile'), async (req, res) => {
  try {
    const { title, preacher } = req.body;

    if (!req.file || !title || !preacher) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const newSermon = new Sermon({
      title,
      preacher,
      videoUrl: fileUrl
    });

    await newSermon.save();

    res.status(201).json({ message: 'Sermon uploaded successfully', fileUrl });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

/**
 * @route   GET /api/sermons
 * @desc    Get all sermons
 */
router.get('/', async (req, res) => {
  try {
    const sermons = await Sermon.find().sort({ date: -1 });
    res.json(sermons);
  } catch (err) {
    console.error('Fetch Error:', err);
    res.status(500).json({ message: 'Failed to fetch sermons' });
  }
});

/**
 * @route   DELETE /api/sermons/:id
 * @desc    Delete a sermon by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const sermon = await Sermon.findById(req.params.id);
    if (!sermon) {
      return res.status(404).json({ message: 'Sermon not found' });
    }

    // Delete the video file from the server
    const filePath = path.join(__dirname, '../', sermon.videoUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove sermon from DB
    await sermon.deleteOne();
    res.json({ message: 'Sermon deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
