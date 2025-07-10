// backend/routes/send-message.js
const express = require('express');
const router = express.Router();
const sendSMS = require('../send-sms');

router.post('/send-message', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: "Phone number and message are required" });
  }

  try {
    const result = await sendSMS(phoneNumber, message);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
