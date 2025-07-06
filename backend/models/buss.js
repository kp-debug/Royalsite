const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
  stop: {
    type: String,
    required: true
  },
  time: {
    type: String, // Format like "7:30 AM"
    required: true
  },
  wait: {
    type: String, // Example: "10 minutes"
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('buss', busStopSchema);
