import VisaRequirement from '../models/VisaRequirement.js';
import axios from 'axios';

const VISA_DB_URL = 'https://aman-sapkota.com.np/travel.json';

let cachedVisaData = null;
let lastFetched = 0;
const CACHE_HOURS = 6; // Refresh every 6 hours

const fetchVisaDatabase = async () => {
  const now = Date.now();
  if (cachedVisaData && now - lastFetched < CACHE_HOURS * 60 * 60 * 1000) {
    return cachedVisaData;
  }

  try {
    console.log('Fetching latest visa database...');
    const { data } = await axios.get(VISA_DB_URL, { timeout: 15000 });
    cachedVisaData = data;
    lastFetched = now;
    console.log(`Visa database loaded: ${data.length} entries`);
    return data;
  } catch (err) {
    console.error('Failed to fetch visa DB:', err.message);
    return cachedVisaData || []; // fallback to old cache
  }
};

export const getVisaRequirements = async (req, res) => {
  let { passport, destination } = req.query;

  if (!passport || !destination) {
    return res.status(400).json({
      success: false,
      message: "Use: ?passport=US&destination=CAN"
    });
  }

  passport = passport.toUpperCase();
  destination = destination.toUpperCase();
  const key = `${passport}_${destination}`;

  try {
    // 1. Check your fast MongoDB cache first
    let record = await VisaRequirement.findOne({ uniqueKey: key });
    if (record) {
      return res.json({
        success: true,
        data: record,
        source: "Your Fast Cache (Instant)"
      });
    }

    // 2. If not cached → get from global database
    const allVisaData = await fetchVisaDatabase();

    const match = allVisaData.find(
      v => v.passport.code === passport && v.destination.code === destination
    );

    if (!match) {
      return res.status(404).json({
        success: false,
        message: `No data for ${passport} to ${destination}`,
        tip: "Try CN to ID, IN to TH, US to MX"
      });
    }

    // 3. Save to your DB for next time (auto-caching)
    await VisaRequirement.create({
      ...match,
      uniqueKey: key
    });

    res.json({
      success: true,
      data: match,
      source: "Global DB + Now Cached Locally",
      cached: true
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Service error – try again"
    });
  }
};