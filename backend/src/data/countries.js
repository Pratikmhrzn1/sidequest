import axios from 'axios';
/**
 * Returns an array of { name, cca2, nationality } objects.
 * Tries REST Countries API first; falls back to local list on failure.
 */
export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(
      'https://restcountries.com/v3.1/all?fields=name,cca2,demonyms',
      { timeout: 8000 }
    );

    return data
      .map(c => ({
        name:        c.name?.common || '',
        cca2:        c.cca2 || '',
        nationality: c.demonyms?.eng?.m || c.name?.common || '',
      }))
      .filter(c => c.name && c.cca2)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.warn('⚠️  REST Countries API unavailable — using fallback list.', err.message);
    return FALLBACK_COUNTRIES;
  }
};