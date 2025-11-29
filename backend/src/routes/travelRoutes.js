// src/routes/travelRoutes.js
const express = require('express');
const router = express.Router();
const {
  getCountries,
  submitTravelApplication,
  getAllApplications
} = require('../controllers/travelController');

router.get('/countries', getCountries);
router.post('/submit', submitTravelApplication);
router.get('/applications', getAllApplications);

module.exports = router;