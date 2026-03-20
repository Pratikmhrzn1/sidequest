import express from 'express';
import TravelApplication from '../models/travelApplication.js';

import {
  getCountries,
  submitTravelApplication,
  getAllApplications,
  getApplicationById,
} from '../controllers/travelController.js';
import { 
  getVisaInfo, 
  addVisaInfo, 
  getVisaInfoByOriginAndNationalityAndDestination 
} from '../controllers/visaInformationController.js';
const router = express.Router();


router.get('/countries', getCountries);
router.post('/submit', submitTravelApplication);
router.get('/applications', getAllApplications);
router.get('/application/:id', getApplicationById);

router.get('/visa', getVisaInfo);
router.post('/visa', addVisaInfo);

router.get('/visa/:origin/:nationality/:destination', getVisaInfoByOriginAndNationalityAndDestination);
router.get('/my-applications', async (req, res) => {
  try {
    const { nationality } = req.query;

    if (!nationality) {
      return res.status(400).json({
        success: false,
        message: "Nationality is required"
      });
    }

   
    const applications = await TravelApplication
      .find({
        nationality: { $regex: `^${nationality}$`, $options: 'i' }
      })
      .sort({ createdAt: -1 }) 
      .select('travelDestination createdAt status adminNote') 
      .lean();

    
    const formatted = applications.map(app => ({
      id: app._id.toString(),
      travelDestination: app.travelDestination,
      createdAt: app.createdAt,
      status: app.status || 'pending',        
    }));

    res.json({
      success: true,
      count: formatted.length,
      applications: formatted
    });

  } catch (error) {
    console.error('Error in /my-applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

export default router;