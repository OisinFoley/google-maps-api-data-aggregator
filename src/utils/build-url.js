const API_KEY = process.env.GOOGLE_API_KEY || require('../config/api-key');
const { googleMapsAPI } = require('../config/base-urls');
const truncateDate = require('./truncate-date');

module.exports = {
  buildGeocodeInfoUrl: (elevationArgs) => {
    const { street, city, state, country } = elevationArgs;
    return `${googleMapsAPI}/geocode/json?address=${street},+${city},+${state},+${country}&key=${API_KEY}`;
  },
  buildElevationInfoUrl: (lat, lng) => {
    return `${googleMapsAPI}/elevation/json?locations=${lat},${lng}&key=${API_KEY}`;
  },
  buildTimezoneInfoUrl: (lat, lng) => {
    const time = truncateDate();
    return `${googleMapsAPI}/timezone/json?location=${lat},${lng}&timestamp=${time}&key=${API_KEY}`;
  }
}