const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Routes
const busRoutes = require('./routes/bus');
const membersRoutes = require('./routes/members');
const sermonsRoutes = require('./routes/sermons');
const adminRoutes = require('./routes/admin');
const imagesRoutes = require('./routes/images');
const prayerRequestRoutes = require('./routes/prayerRequests');
const eventsRoutes = require('./routes/events');
const testimoniesRoutes = require('./routes/testimonies');
const ministriesRoutes = require('./routes/ministries');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Ensure upload folders exist
['uploads/flyers', 'uploads/videos'].forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// 🔧 Connect to Local MongoDB (edit .env to use this if not already)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/royalsite';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err.message));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/members', membersRoutes);
app.use('/api/sermons', sermonsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/prayer-requests', prayerRequestRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/testimonies', testimoniesRoutes);
app.use('/api/ministries', ministriesRoutes);
app.use('/api/bus', busRoutes);

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/royal.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
