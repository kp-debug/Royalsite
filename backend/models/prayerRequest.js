const mongoose = require('mongoose');

const PrayerRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  whatsapp: String,
  request: { type: String, required: true }
}, {
  timestamps: true // ✅ Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('PrayerRequest', PrayerRequestSchema);
