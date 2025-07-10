// backend/send-sms.js
const axios = require('axios');
require('dotenv').config();

async function sendSMS(phoneNumber, message) {
  const username = process.env.AT_USERNAME;
  const apiKey = process.env.AT_API_KEY;

  const payload = new URLSearchParams();
  payload.append('username', username);
  payload.append('to', phoneNumber);
  payload.append('message', message);

  try {
    const response = await axios.post(
      'https://api.africastalking.com/version1/messaging',
      payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': apiKey,
        },
      }
    );

    console.log('✅ SMS sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ SMS sending error:', error.response?.data || error.message);
    throw new Error('Failed to send SMS');
  }
}

module.exports = sendSMS;
