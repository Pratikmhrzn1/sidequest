const TravelApplication = require('../models/travelApplication');
const { fetchCountries } = require('../../../frontend/app/data/countries');

let validCountryNames = null;

const loadValidCountries = async () => {
  if (!validCountryNames) {
    const countries = await fetchCountries();
    validCountryNames = new Set(countries.map(c => c.name.toLowerCase().trim()));
  }
  return validCountryNames;
};

const getCountries = async (req, res) => {
  try {
    const countries = await fetchCountries();
    const names = countries.map(c => c.name);
    res.json({ success: true, count: names.length, countries: names, fullData: countries });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to load countries' });
  }
};

const submitTravelApplication = async (req, res) => {
  let { countryOfResidence, travelDestination, nationality } = req.body;

  if (!countryOfResidence || !travelDestination || !nationality)
    return res.status(400).json({ success: false, message: 'All fields are required' });

  countryOfResidence = countryOfResidence.trim();
  travelDestination = travelDestination.trim();
  nationality = nationality.trim();

  try {
    const validCountries = await loadValidCountries();
    const normalize = s => s.toLowerCase().trim();

    const isResValid = validCountries.has(normalize(countryOfResidence));
    const isDestValid = validCountries.has(normalize(travelDestination));
    const isNatValid = validCountries.has(normalize(nationality));

    if (!isResValid || !isDestValid || !isNatValid) {
      const errors = [];
      if (!isResValid) errors.push(`Residence: "${countryOfResidence}"`);
      if (!isDestValid) errors.push(`Destination: "${travelDestination}"`);
      if (!isNatValid) errors.push(`Nationality: "${nationality}"`);
      return res.status(400).json({ success: false, message: 'Invalid country selected', invalidFields: errors, tip: 'Please select from the dropdown' });
    }

    const application = new TravelApplication({
      countryOfResidence,
      travelDestination,
      nationality
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: 'Submitted successfully!',
      application: {
        id: application._id,
        countryOfResidence,
        travelDestination,
        nationality,
        submittedAt: application.submittedAt
      }
    });

  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const apps = await TravelApplication.find().sort({ createdAt: -1 });
    res.json({ success: true, count: apps.length, applications: apps });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to load data' });
  }
};

module.exports = { getCountries, submitTravelApplication, getAllApplications };
