// backend/send-sms.js
const axios = require('axios');
require('dotenv').config();

async function sendSMS(phoneNumber, message) {
  try {
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
          message: message,
          // ❌ Sender ID removed – uses default AFRICASTKNG
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ SMS sending error:', error.response?.data || error.message);
    throw new Error(error.response?.data || error.message);
  }
}

module.exports = sendSMS;
