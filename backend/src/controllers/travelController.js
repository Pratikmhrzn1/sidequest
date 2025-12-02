// src/controllers/travelController.js
import TravelApplication from '../models/travelApplication.js';
import { fetchCountries } from '../../../frontend/app/data/countries.js';

let validCountryNames = null;

const loadValidCountries = async () => {
  if (!validCountryNames) {
    try {
      const countries = await fetchCountries();
      validCountryNames = new Set(countries.map(c => c.name.toLowerCase().trim()));
      console.log(`Loaded ${validCountryNames.size} valid countries`);
    } catch (err) {
      console.error('Error loading countries:', err);
      throw err;
    }
  }
  return validCountryNames;
};

export const getCountries = async (req, res) => {
  try {
    const countries = await fetchCountries();
    const names = countries.map(c => c.name);
    console.log(`Returning ${names.length} countries`);
    res.json({ success: true, count: names.length, countries: names, fullData: countries });
  } catch (err) {
    console.error('Failed to get countries:', err);
    res.status(500).json({ success: false, message: 'Failed to load countries', error: err.message });
  }
};

export const submitTravelApplication = async (req, res) => {
  console.log('Received request body:', req.body);

  let { countryOfResidence, travelDestination, nationality } = req.body;

  if (!countryOfResidence || !travelDestination || !nationality) {
    console.warn('Missing required fields');
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  countryOfResidence = countryOfResidence.trim();
  travelDestination = travelDestination.trim();
  nationality = nationality.trim();

  try {
    const validCountries = await loadValidCountries();
    const normalize = s => s.toLowerCase().trim();

    const isResValid = validCountries.has(normalize(countryOfResidence));
    const isDestValid = validCountries.has(normalize(travelDestination));
    const isNatValid = validCountries.has(normalize(nationality));

    console.log('Validation results:', { isResValid, isDestValid, isNatValid });

    if (!isResValid || !isDestValid || !isNatValid) {
      const errors = [];
      if (!isResValid) errors.push(`Residence: "${countryOfResidence}"`);
      if (!isDestValid) errors.push(`Destination: "${travelDestination}"`);
      if (!isNatValid) errors.push(`Nationality: "${nationality}"`);
      console.warn('Invalid country selection:', errors);
      return res.status(400).json({
        success: false,
        message: 'Invalid country selected',
        invalidFields: errors,
        tip: 'Please select from the dropdown'
      });
    }

    const application = new TravelApplication({
      countryOfResidence,
      travelDestination,
      nationality
    });

    const savedApp = await application.save();
    console.log('Application saved successfully:', savedApp);

    res.status(201).json({
      success: true,
      message: 'Submitted successfully!',
      application: {
        id: savedApp._id,
        countryOfResidence,
        travelDestination,
        nationality,
        submittedAt: savedApp.submittedAt
      }
    });

  } catch (err) {
    console.error('Error submitting travel application:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const apps = await TravelApplication.find().sort({ createdAt: -1 });
    console.log(`Returning ${apps.length} applications`);
    res.json({ success: true, count: apps.length, applications: apps });
  } catch (err) {
    console.error('Failed to load applications:', err);
    res.status(500).json({ success: false, message: 'Failed to load data', error: err.message });
  }
};
