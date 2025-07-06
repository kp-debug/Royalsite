const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const busRoutes = require('./routes/bus');


// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Ensure upload folders exist
['uploads/flyers', 'uploads/videos'].forEach(dir => {
  if (!fs.existsSync(path.join(__dirname, dir))) {
    fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
  }
});

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/members', require('./routes/members'));
app.use('/api/sermons', require('./routes/sermons'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/images', require('./routes/images')); 
app.use('/api/prayer-requests', require('./routes/prayerRequests'));
app.use('/api/events', require('./routes/events'));
app.use('/api/testimonies', require('./routes/testimonies'));
app.use('/api/ministries', require('./routes/ministries'));
app.use('/api/bus', busRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
