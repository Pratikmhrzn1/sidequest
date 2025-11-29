import axios from 'axios';

let cachedCountries = null;
let lastFetched = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const fetchCountries = async () => {
  if (cachedCountries && lastFetched && (Date.now() - lastFetched < CACHE_DURATION)) {
    return cachedCountries;
  }

  try {
    console.log('Fetching countries from REST Countries API...');
    const response = await axios.get(
      'https://restcountries.com/v3.1/all?fields=name,capital,currencies'
    );

    const countries = response.data
      .map(country => ({
        name: country.name?.common || 'Unknown',
        officialName: country.name?.official || '',
        capital: country.capital?.[0] || 'N/A',
        currency: country.currencies
          ? Object.values(country.currencies)[0]?.name || 'N/A'
          : 'N/A',
        currencySymbol: country.currencies
          ? Object.values(country.currencies)[0]?.symbol || ''
          : ''
      }))
      .filter(c => c.name !== 'Unknown')
      .sort((a, b) => a.name.localeCompare(b.name));

    cachedCountries = countries;
    lastFetched = Date.now();
    console.log(`Loaded ${countries.length} countries`);
    return countries;

  } catch (error) {
    console.error('REST Countries API failed:', error.message);
    return getFallbackCountries();
  }
};

const getFallbackCountries = () => [
  { name: "India", officialName: "Republic of India", capital: "New Delhi", currency: "Indian rupee", currencySymbol: "₹" },
  { name: "Nepal", officialName: "Federal Democratic Republic of Nepal", capital: "Kathmandu", currency: "Nepalese rupee", currencySymbol: "₨" },
  { name: "United States", officialName: "United States of America", capital: "Washington, D.C.", currency: "United States dollar", currencySymbol: "$" }
].sort((a, b) => a.name.localeCompare(b.name));
