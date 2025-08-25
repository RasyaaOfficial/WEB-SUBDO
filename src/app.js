require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const subdomainRoutes = require('./routes/subdomainRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((e) => {
  console.error('MongoDB connection error:', e);
});

// Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(subdomainRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Socket.IO setup will be done in server.js and injected here
// Attach io instance to app for routes usage
app.set('io', null);

module.exports = app;
