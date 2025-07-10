// backend/routes/send-message.js
const express = require('express');
const router = express.Router();
const sendSMS = require('../send-sms');

router.post('/send-message', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

  try {
    console.log("📲 Sending SMS to:", phoneNumber); // Log phone
    console.log("📩 Message:", message);             // Log message

    const result = await sendSMS(phoneNumber, message);

    console.log("✅ SMS sent successfully:", result); // Log result
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("❌ SMS send failed:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
