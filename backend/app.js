// app.js — SoyHaven server entry point

// Database Connection Fix
if (!process.env.VERCEL) {
  require('node:dns').setServers(['8.8.8.8', '1.1.1.1']);
}

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json()); 


app.use(express.static(path.join(__dirname, 'public')));

let connectionPromise = null;

function connectDB() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 8000,
      })
      .then(() => console.log('MongoDB connected'))
      .catch((err) => {
        connectionPromise = null; 
        throw err;
      });
  }
  return connectionPromise;
}

app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    res.status(503).json({ message: 'Database unavailable' });
  }
});

// API routes
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/admin', require('./routes/admin'));

// Start the server only when run directly (Vercel imports the app instead)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SoyHaven running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;