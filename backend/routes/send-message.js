// backend/routes/send-message.js
const express = require('express');
const router = express.Router();
const sendSMS = require('../send-sms');

router.post('/', async (req, res) => {
  const { phoneNumber } = req.body;
  const message = "Welcome to Royal Seed Chapel! We’re excited to have you. Expect powerful updates and devotionals.";

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const result = await sendSMS(phoneNumber, message);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
