const axios = require('axios');
require('dotenv').config();

async function sendSMS(phoneNumber, message) {
  const senderId = process.env.SENDER_ID || 'africastkn'; // fallback sender ID

  try {
    const response = await axios.post(
      'https://api.africastalking.com/version1/messaging',
      new URLSearchParams({
        username: process.env.AT_USERNAME,
        to: phoneNumber,
        message: message,
        from: senderId,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': process.env.AT_API_KEY,
        },
      }
    );

    console.log('✅ SMS Sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ SMS Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.SMSMessageData?.Message || 'Failed to send SMS');
  }
}

module.exports = sendSMS;
