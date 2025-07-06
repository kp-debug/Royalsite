const express = require('express');
const router = express.Router();
const PrayerRequest = require('../models/prayerRequest');

// ✅ POST: Submit a prayer request
router.post('/', async (req, res) => {
  try {
    const { name, email, whatsapp, request } = req.body;

    if (!request || !email || !whatsapp) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRequest = new PrayerRequest({ name, email, whatsapp, request });
    await newRequest.save();
    res.status(201).json({ message: 'Prayer request submitted' });
  } catch (err) {
    console.error('Prayer submission error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET: Get all prayer requests (admin only)
router.get('/', async (req, res) => {
  try {
    const requests = await PrayerRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error('Prayer fetch error:', err);
    res.status(500).json({ message: 'Failed to load prayer requests' });
  }
});

// ✅ DELETE: Delete a specific prayer request by ID
router.delete('/:id', async (req, res) => {
  try {
    const request = await PrayerRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    await request.deleteOne();
    res.json({ message: 'Prayer request deleted successfully' });
  } catch (err) {
    console.error('Prayer delete error:', err);
    res.status(500).json({ message: 'Failed to delete request' });
  }
});

module.exports = router;
