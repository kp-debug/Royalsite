// backend/send-sms.js
const axios = require('axios');
const qs = require('qs'); // Ensure this is installed: npm install qs
require('dotenv').config();

async function sendSMS(phoneNumber, message) {
  const senderId = process.env.SENDER_ID || 'africastkn';

  const payload = qs.stringify({
    username: process.env.AT_USERNAME,
    to: phoneNumber,
    message,
    from: senderId,
  });

  try {
    const response = await axios.post(
      'https://api.africastalking.com/version1/messaging',
      payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': process.env.AT_API_KEY,
        },
      }
    );

    // Return a success flag so frontend can process it
    return { success: true, raw: response.data };
  } catch (error) {
    console.error('❌ SMS sending error:', error.response?.data || error.message);
    throw new Error('Failed to send SMS');
  }
}

module.exports = sendSMS;
