// backend/send-sms.js
const axios = require('axios');
require('dotenv').config();

async function sendSMS(phoneNumber, message) {
  const senderId = process.env.SENDER_ID || 'africastkn'; // fallback

  const response = await axios.post(
    'https://api.africastalking.com/version1/messaging',
    null,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apiKey': process.env.AT_API_KEY,
      },
      params: {
        username: process.env.AT_USERNAME,
        to: phoneNumber,
        message,
        from: senderId,
      },
    }
  );

  return response.data;
}

module.exports = sendSMS;
