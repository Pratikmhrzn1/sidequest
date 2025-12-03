// src/routes/travelRoutes.js
import express from 'express';
import {
  getCountries,
  submitTravelApplication,
  getAllApplications
} from '../controllers/travelController.js';

import { getVisaRequirements } from '../controllers/visaController.js';  // ← FIXED PATH

const router = express.Router();

// Your existing routes
router.get('/countries', getCountries);
router.post('/submit', submitTravelApplication);
router.get('/applications', getAllApplications);

// ADD THIS LINE — Visa route inside router
router.get('/visa', getVisaRequirements);

export default router;
