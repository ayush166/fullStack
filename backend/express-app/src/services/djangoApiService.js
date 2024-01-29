const axios = require('axios');
const { getRecentStrings } = require('../utils/recentStringStore.js');

async function callDjangoNgramsApi() {
    const recentStrings = getRecentStrings();
    if (recentStrings.length < 2) {
      throw new Error("Not enough strings to compare.");
    }
    
    const string1 = recentStrings[0];
    const string2 = recentStrings[1];
    try {
      const response = await axios.get('http://localhost:8000/api/ngrams/', { params: { string1, string2 } });
      return response.data;
    } catch (error) {
      console.error('Error calling Django API for ngrams:', error);
      throw error;
    }
}

module.exports = { callDjangoNgramsApi };