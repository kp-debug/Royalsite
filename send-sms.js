require('dotenv').config();
const Africastalking = require('africastalking');

// Initialize Africa's Talking
const africastalking = Africastalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

const sms = africastalking.SMS;

// Send SMS function
const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await sms.send({
      to: [phoneNumber],
      message: message,
    });
    console.log('✅ SMS Sent:', response);
    return response;
  } catch (err) {
    console.error('❌ SMS Error:', err);
    return err;
  }
};

module.exports = sendSMS;
