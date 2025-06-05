require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const ingestRoutes = require('./routes/ingest');
const statusRoutes = require('./routes/status');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON
app.use(express.json());

// Mount routes
app.use('/ingest', ingestRoutes);     // Properly mount at /ingest
app.use('/status', statusRoutes);     // Properly mount at /status

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed.', err);
    process.exit(1);
  });
