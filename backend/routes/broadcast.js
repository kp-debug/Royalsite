const express = require('express');
const router = express.Router();
const Member = require('../models/member'); // assuming your model is Member.js
const sendSMS = require('../../send-sms'); // shared function

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const members = await Member.find({}, 'phone'); // Only get phone numbers
    let sentCount = 0;

    for (const member of members) {
      if (/^\+?\d{10,15}$/.test(member.phone)) {
        try {
          await sendSMS(member.phone, message);
          sentCount++;
        } catch (smsErr) {
          console.error(`❌ SMS to ${member.phone} failed`, smsErr.message);
        }
      }
    }

    res.json({ success: true, count: sentCount });
  } catch (err) {
    console.error('❌ Broadcast Error:', err.message);
    res.status(500).json({ success: false, error: 'Server error while broadcasting' });
  }
});

module.exports = router;
