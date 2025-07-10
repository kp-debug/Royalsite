// send-sms.js
const axios = require('axios');
require('dotenv').config();

async function sendSMS(phoneNumber, message) {
  const senderId = process.env.SENDER_ID || 'africastkn';

  const params = new URLSearchParams();
  params.append('username', process.env.AT_USERNAME);
  params.append('to', phoneNumber);
  params.append('message', message);
  params.append('from', senderId);

  const response = await axios.post(
    'https://api.africastalking.com/version1/messaging',
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apiKey': process.env.AT_API_KEY,
      },
    }
  );

  return response.data;
}

module.exports = sendSMS;
