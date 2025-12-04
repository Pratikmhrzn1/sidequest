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
  try {
    const { countryOfResidence, travelDestination, nationality } = req.body;

    const newApplication = new TravelApplication({
      countryOfResidence,
      travelDestination,
      nationality,
      status:'pending'
    });
    const app = await newApplication.save();
    const { _id: id, __v, ...rest } = app.toObject();

    res.status(201).json({
      success: true,
      message: "Application saved!",
      application: { ...rest, id: id.toString() }
    });

  } catch (error) {
    console.error("Submit error:", error);
    res.status(500).json({ success: false, message: "Failed to save application" });
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
export const getApplicationById = async (req, res) => {
  try {
    const app = await TravelApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    res.json({
      success: true,
      application: app
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
