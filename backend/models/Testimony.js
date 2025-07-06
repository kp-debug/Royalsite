// models/Testimony.js
const mongoose = require('mongoose');

const TestimonySchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, default: 'pending' }, // 'pending' or 'approved'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimony', TestimonySchema);
