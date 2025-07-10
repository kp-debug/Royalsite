// routes/send-message.js
const express = require('express');
const router = express.Router();
const sendSMS = require('../send-sms');

router.post('/', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required' });
  }

  try {
    const response = await sendSMS(phoneNumber, message);
    res.status(200).json(response); // ✅ Return the actual response for debugging
  } catch (err) {
    console.error('❌ Error sending SMS:', err.message);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

module.exports = router;
