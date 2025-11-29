const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const travelRoutes = require('./src/routes/travelRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/travel', travelRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Travel Visa Backend API is running!' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Pre-load countries when server starts
// require('./src/data/countries').fetchCountries()
//   .then(countries => console.log(`Pre-loaded ${countries.length} countries`))
//   .catch(() => console.log('Started with fallback countries'));