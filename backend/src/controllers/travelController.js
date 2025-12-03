// src/controllers/travelController.js
import TravelApplication from '../models/travelApplication.js';
import { fetchCountries } from '../data/countries.js';

export const getCountries = async (req, res) => {
  try {
    const countries = await fetchCountries();
    const formatted = countries.map(c => ({
      name: c.name,
      cca2: c.cca2,
      nationality: c.nationality
    }));

    res.json({
      success: true,
      count: formatted.length,
      countries: formatted
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load countries' });
  }
};

export const submitTravelApplication = async (req, res) => {
  const { countryOfResidence, travelDestination, nationality } = req.body;

  if (!countryOfResidence || !travelDestination || !nationality) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  try {
    const app = new TravelApplication({
      countryOfResidence,
      travelDestination,
      nationality
    });
    await app.save();

    res.status(201).json({
      success: true,
      message: 'Application saved!',
      application: app
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const apps = await TravelApplication.find().sort({ createdAt: -1 });
    res.json({ success: true, count: apps.length, applications: apps });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch' });
  }
};