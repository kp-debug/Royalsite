const express = require("express");
const router = express.Router();
const Africastalking = require("africastalking");
const Member = require("../models/Member"); // your members model

// Africa's Talking setup
const africastalking = Africastalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const sms = africastalking.SMS;

// POST /send-broadcast
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: "Message is required" });
    }

    // Fetch all members from DB
    const members = await Member.find({}, "phone"); // only get phone numbers
    if (!members.length) {
      return res.status(404).json({ success: false, error: "No members found" });
    }

    // Format phone numbers
    const phoneNumbers = members.map(m => {
      let phone = m.phone.replace(/\s+/g, "");
      if (phone.startsWith("0")) {
        phone = "+233" + phone.slice(1);
      }
      return phone;
    });

    // Send SMS
    const response = await sms.send({
      to: phoneNumbers,
      message: message,
      from: "ROYALSEED"
    });

    console.log("✅ Broadcast sent:", response);

    res.json({
      success: true,
      count: phoneNumbers.length,
      response
    });

  } catch (err) {
    console.error("❌ Broadcast Error:", err);
    res.status(500).json({ success: false, error: "Server error", details: err.message });
  }
});

module.exports = router;

