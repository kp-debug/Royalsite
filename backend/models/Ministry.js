const mongoose = require('mongoose');

const MinistrySchema = new mongoose.Schema({
  name: String,
  phone: String,
  ministry: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ministry', MinistrySchema);
