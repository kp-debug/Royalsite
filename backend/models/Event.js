const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  fullDetails: { type: String },
  flyer: { type: String },   // image URL
  video: { type: String }    // video URL
});

module.exports = mongoose.model('Event', EventSchema);
