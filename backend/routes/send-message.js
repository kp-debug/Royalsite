const express = require('express');
const router = express.Router();
const sendSMS = require('../../send-sms');

router.post('/', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required' });
  }

  try {
    const result = await sendSMS(phoneNumber, message);

    // Log and respond with raw text instead of assuming JSON
    console.log("✅ SMS Sent:", result);

    res.status(200).json({ success: true, result }); // now it's wrapped in JSON
  } catch (error) {
    console.error('❌ Error sending SMS:', error.message);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

module.exports = router;
