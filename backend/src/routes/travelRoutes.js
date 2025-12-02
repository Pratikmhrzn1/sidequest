// src/routes/travelRoutes.js
import express from 'express';
import {
  getCountries,
  submitTravelApplication,
  getAllApplications
} from '../controllers/travelController.js'; // note the .js extension

const router = express.Router();

router.get('/countries', getCountries);
router.post('/submit', submitTravelApplication);
router.get('/applications', getAllApplications);

export default router;
