const express = require('express');
const router = express.Router();
const Member = require('../models/member');
const sendSMS = require('../../send-sms');

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const members = await Member.find({}, 'phone');
    let sentCount = 0;
    let failedNumbers = [];

    for (const member of members) {
      const phone = member.phone?.trim();

      if (/^\+?\d{10,15}$/.test(phone)) {
        try {
          await sendSMS(phone, message);
          console.log(`✅ SMS sent to ${phone}`);
          sentCount++;
        } catch (smsErr) {
          console.error(`❌ SMS failed to ${phone}:`, smsErr.message);
          failedNumbers.push(phone);
        }
      } else {
        console.warn(`⚠️ Skipped invalid phone: ${phone}`);
        failedNumbers.push(phone);
      }
    }

    res.json({
      success: true,
      message: `Broadcast completed.`,
      sent: sentCount,
      failed: failedNumbers.length,
      failedNumbers
    });
  } catch (err) {
    console.error('❌ Broadcast Error:', err.message);
    res.status(500).json({ success: false, error: 'Server error during broadcast' });
  }
});

module.exports = router;
