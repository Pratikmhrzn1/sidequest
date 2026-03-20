import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import travelRoutes from './src/routes/travelRoutes.js';
import deviceRoutes from './src/routes/deviceroute.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',deviceRoutes);
app.use('/api/travel',travelRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'The backend is running :',
    endpoints: {
      countries:'GET  /api/travel/countries',
      submit:'POST /api/travel/submit',
      applications:'GET  /api/travel/applications',
      myApplications:'GET  /api/travel/my-applications?nationality=Nepal',
      applicationById:'GET  /api/travel/application/:id',
      visa:'GET  /api/travel/visa?nationality=Nepal&destination=Japan',
      visaAdd:'POST /api/travel/visa',
      visaByParams:'GET  /api/travel/visa/:origin/:nationality/:destination',
    },
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error:   err.message,
  });
});

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('MONGO DB URL is not defined in the .env file');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected cuccessfully!');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });