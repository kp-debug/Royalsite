const express = require('express');
const router = express.Router();
const Member = require('../models/member');
const { Parser } = require('json2csv'); // For CSV export

// POST: Add new member
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, address, role, dob } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    const newMember = new Member({ name, phone, email, address, role, dob });
    await newMember.save();
    res.status(201).json({ message: 'Member registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve members' });
  }
});

// GET member by phone
router.get('/phone/:phone', async (req, res) => {
  try {
    const member = await Member.findOne({ phone: req.params.phone });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE member by ID
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// EXPORT members as CSV
router.get('/export/csv', async (req, res) => {
  try {
    const members = await Member.find();
    const fields = ['name', 'phone', 'email', 'dob', 'address', 'role'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(members);

    res.header('Content-Type', 'text/csv');
    res.attachment('members.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'CSV export failed' });
  }
});

module.exports = router;
