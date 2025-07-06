const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  role: {
    type: String,
    enum: ['member', 'worker', 'pastor'],
    default: 'member'
  },
  dob: { // ✅ Date of Birth
    type: Date,
    required: false
  },
  joinedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // ✅ Adds createdAt and updatedAt
});

module.exports = mongoose.model('Member', MemberSchema);
