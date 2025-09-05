const axios = require('axios');
require('dotenv').config();

/**
 * Send SMS via Africa's Talking API
 * @param {string} phoneNumber - Recipient's phone number (e.g. +233xxxxxxxxx)
 * @param {string} message - Message text
 * @returns {Promise<object>} - Response data from Africa's Talking
 */
async function sendSMS(phoneNumber, message) {
  const username = process.env.AT_USERNAME;
  const apiKey = process.env.AT_API_KEY;
  const senderId = process.env.SENDER_ID || 'RSCI'; // Use .env or fallback

  // 🔎 Debug: log exactly what we're sending
  console.log("📬 Payload sent to Africa's Talking:", {
    username,
    to: phoneNumber,
    message,
    from: senderId
  });

  const params = new URLSearchParams();
  params.append('username', username);
  params.append('to', phoneNumber);
  params.append('message', message);
  params.append('from', senderId);

  try {
    const response = await axios.post(
      'https://api.africastalking.com/version1/messaging',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': apiKey
        }
      }
    );

    console.log('✅ SMS sent successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('❌ SMS sending error:', error.response?.data || error.message);
    throw new Error('Failed to send SMS');
  }
}

module.exports = sendSMS;
