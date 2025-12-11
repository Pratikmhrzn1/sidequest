import express from 'express';
import TravelApplication from '../models/travelApplication.js';

import {
  getCountries,
  submitTravelApplication,
  getAllApplications,
  getApplicationById,
} from '../controllers/travelController.js';
import { getVisaInfo } from '../controllers/visaInfoController.js';
const router = express.Router();


router.get('/countries', getCountries);
router.post('/submit', submitTravelApplication);
router.get('/applications', getAllApplications);
router.get('/application/:id', getApplicationById);

router.get('/visa-info', getVisaInfo);

router.get('/my-applications', async (req, res) => {
  try {
    const { nationality } = req.query;

    if (!nationality) {
      return res.status(400).json({
        success: false,
        message: "Nationality is required"
      });
    }

    // Find applications where nationality matches (case-insensitive)
    const applications = await TravelApplication
      .find({
        nationality: { $regex: `^${nationality}$`, $options: 'i' }
      })
      .sort({ createdAt: -1 }) // newest first
      .select('travelDestination createdAt status adminNote') // only needed fields
      .lean();

    // Format exactly how your mobile app expects
    const formatted = applications.map(app => ({
      id: app._id.toString(),
      travelDestination: app.travelDestination,
      createdAt: app.createdAt,
      status: app.status || 'pending',        // supports: pending, in-process, approved, rejected
      adminNote: app.adminNote || null
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