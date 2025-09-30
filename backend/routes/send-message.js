const express = require("express");
const router = express.Router();
const Africastalking = require("africastalking");

// Africastalking setup
const africastalking = Africastalking({
  apiKey: process.env.AT_API_KEY,   // put in .env
  username: process.env.AT_USERNAME // put in .env
});

const sms = africastalking.SMS;

// POST /send-message
router.post("/", async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ success: false, message: "Missing phone or message" });
    }

    const response = await sms.send({
      to: [phoneNumber],
      message: message,
      from: "ROYALSEED" // your approved sender ID
    });

    console.log("✅ SMS sent:", response);
    res.json({ success: true, response });

  } catch (error) {
    console.error("❌ SMS Error:", error);
    res.status(500).json({ success: false, message: "Failed to send SMS", error });
  }
});

module.exports = router;
