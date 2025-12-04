// backend/server.js
import express, { application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import travelRoutes from './src/routes/travelRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/travel', travelRoutes);
// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Travel Agency Backend Running!',
    endpoints: {
      countries: '/api/travel/countries',
      submit: 'POST /api/travel/submit',
      visa: '/api/travel/visa?passport=US&destination=ID',
      

    }
  });
});

// MongoDB
const MONGO_URI = process.env.MONGODB_URI ;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // console.log(`Visa Checker: http://localhost:${PORT}/api/travel/visa?passport=CN&destination=ID`);
});