const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

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
const sendMessageRoute = require('./routes/send-message'); // ✅ SMS Route

app.use('/api/members', membersRoutes);
app.use('/api/sermons', sermonsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/prayer-requests', prayerRequestRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/testimonies', testimoniesRoutes);
app.use('/api/ministries', ministriesRoutes);
app.use('/api/bus', busRoutes);
app.use('/send-message', sendMessageRoute); // ✅ SMS Route

// Default Route
app.get('/', (req, res) => {
  res.send('🚀 Royal Seed Chapel Server Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
