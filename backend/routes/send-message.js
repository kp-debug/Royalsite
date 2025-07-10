const express = require('express');
const router = express.Router();
const sendSMS = require('../send-sms');

router.post('/send-message', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const result = await sendSMS(phoneNumber, message);
    res.json({ success: true, info: result.raw });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
