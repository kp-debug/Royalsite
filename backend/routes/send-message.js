const express = require('express');
const router = express.Router();
const sendSMS = require('../../send-sms');

router.post('/', async (req, res) => {
  const { phoneNumber, message } = req.body;

  // Input validation
  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required' });
  }

  try {
    // 🔎 Debug: log incoming request and sender ID
    console.log("📩 Incoming SMS request from website form:", {
      to: phoneNumber,
      message: message,
      senderId: process.env.SENDER_ID || 'RSCI'
    });

    const result = await sendSMS(phoneNumber, message);

    // 🔎 Debug: log Africa's Talking response
    console.log("📤 Response from Africa's Talking:", JSON.stringify(result, null, 2));

    res.status(200).json({
      success: true,
      message: 'SMS sent successfully',
      data: result
    });

  } catch (error) {
    console.error('❌ Error sending SMS:', error.message);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

module.exports = router;
