// models/Sermon.js
const mongoose = require('mongoose');

const SermonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  preacher: { type: String, required: true },
  videoUrl: { type: String }, // This will now hold the uploaded file URL too
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sermon', SermonSchema);
