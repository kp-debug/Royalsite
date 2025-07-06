const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Image = require('../models/image');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/images');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Upload image
router.post('/upload', upload.single('imageFile'), async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrl = `/uploads/images/${req.file.filename}`;

    const newImage = new Image({ title, imageUrl });
    await newImage.save();

    res.status(201).json({ message: 'Image uploaded', image: newImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Get all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

// Delete image
router.delete('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    const filePath = path.join(__dirname, '../', image.imageUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await image.deleteOne();
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed' });
  }
});

module.exports = router;
