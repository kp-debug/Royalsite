 const express = require('express'); 
const router = express.Router();
const Member = require('../models/member');
const { Parser } = require('json2csv');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST: Register new member
router.post('/', async (req, res) => {
  try {
    let { name, phone, email, address, role, dob } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    // Clean and standardize phone
    phone = phone.replace(/\s+/g, '');
    if (phone.startsWith('0')) {
      phone = '+233' + phone.slice(1);
    }

    const newMember = new Member({
      name: name.trim(),
      phone,
      email,
      address,
      role,
      dob,
    });

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
    const phone = req.params.phone.replace(/\s+/g, '');
    const member = await Member.findOne({ phone });

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

// POST: FLEXIBLE LOGIN with Remember Me
router.post('/login', async (req, res) => {
  try {
    let { name, phone, rememberMe } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    name = name.trim().toLowerCase();
    phone = phone.replace(/\s+/g, '');

    if (phone.startsWith('0')) {
      phone = '+233' + phone.slice(1);
    } else if (!phone.startsWith('+233')) {
      return res.status(400).json({ message: 'Invalid phone format' });
    }

    const member = await Member.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      phone,
    });

    if (!member) {
      return res.status(404).json({ message: 'Member not found in records' });
    }

    const expiresIn = rememberMe ? '30d' : '1h';
    const token = jwt.sign(
      { id: member._id, name: member.name },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful', member, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login error, please try again' });
  }
});

// LOGOUT route to clear token
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;  