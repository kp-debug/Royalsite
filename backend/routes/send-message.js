// backend/routes/api/sms.js
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
    const result = await sendSMS(phoneNumber, message);

    // Debug logs
    console.log("✅ SMS sent successfully!");
    console.log("➡️  To:", phoneNumber);
    console.log("📝 Message:", message);
    console.log("📤 Response from Africa's Talking:", result);

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
