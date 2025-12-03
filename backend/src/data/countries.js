import axios from 'axios';
let cachedCountries = null;
let lastFetched = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const fetchCountries = async () => {
  if (cachedCountries && lastFetched && (Date.now() - lastFetched < CACHE_DURATION)) {
    console.log('Countries: Using cache');
    return cachedCountries;
  }

  const urls = [
    'https://restcountries.com/v3.1/all?fields=name,cca2,flags',
    'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag',
    'https://flagcdn.com/en/codes.json' 
  ];

  for (const url of urls) {
    try {
      console.log(`Trying: ${url}`);
      const response = await axios.get(url, { timeout: 20000 });

      let list = [];

      if (url.includes('restcountries.com')) {
        list = response.data
          .map(c => ({
            name: c.name?.common || c.name,
            cca2: c.cca2 || c.alpha2Code,
            flag: c.flags?.png || c.flag || `https://flagcdn.com/w320/${(c.cca2 || c.alpha2Code || '').toLowerCase()}.png`
          }))
          .filter(c => c.name && c.cca2);
      }

      if (list.length > 200) {
        list.sort((a, b) => a.name.localeCompare(b.name));
        cachedCountries = list;
        lastFetched = Date.now();
        console.log(`Loaded ${list.length} countries from API`);
        return list;
      }
    } catch (e) {
      console.log(`Failed: ${url}`, e.message);
    }
  }
  cachedCountries = fullFallback;
  lastFetched = Date.now();
  console.log(`Fallback loaded: ${fullFallback.length} countries`);
  return fullFallback;
};
