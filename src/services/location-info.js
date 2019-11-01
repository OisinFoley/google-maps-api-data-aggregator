const API_KEY = process.env.GOOGLE_API_KEY || require('../config/api-key');
const { googleMapsAPI } = require('../config/base-urls');
const truncateDate = require('../utils/truncate-date');
const request = require('request');

getGeocodeInfo = (elevationArgs) => {
  const { street, city, state, country } = elevationArgs;
  // TODO: add a buildURL util function
  const requestUrl = `${googleMapsAPI}/geocode/json?address=${street},+${city},+${state},+${country}&key=${API_KEY}`;
  
  return new Promise((resolve, reject) => {
    let elevationInfo = {};
    request.get(requestUrl, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      body = JSON.parse(body);
      // TODO: branch out into a util function to extract the lat and lng
      if (body.results && body.results.length > 0) {
        let [results] = body.results;
        let { 
          geometry : { location }
        } = results;
        var { lat, lng } = location;
      }

      resolve({ lat, lng });
    });
  });
}

getElevationInfo = (lat, lng) => {
  // TODO: add a buildURL util function
  const requestUrl = `${googleMapsAPI}/elevation/json?locations=${lat},${lng}&key=${API_KEY}`;
  return new Promise((resolve, reject) => {
    request.get(requestUrl, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      body = JSON.parse(body);
      // TODO: branch out into a util function to extract the elevation
      if (body.results && body.results.length > 0) {
        let [results] = body.results;
        var { elevation } = results;
      }

      resolve({ elevation });
    });
  });
};

getTimezoneInfo = (lat, lng) => {
// sample: https://maps.googleapis.com/maps/api/timezone/json?location=49.2829257,-123.1106525&timestamp=1458000000&key=APIKEY
  const time = truncateDate();  
  // TODO: add a buildURL util function
  const requestUrl = `${googleMapsAPI}/timezone/json?location=${lat},${lng}&timestamp=${time}&key=${API_KEY}`;
  return new Promise((resolve, reject) => {
    request.get(requestUrl, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      body = JSON.parse(body);
      let { timeZoneId, rawOffset } = body;
      let offsetHoursUTC = rawOffset / 3600;

      resolve({ timeZoneId, offsetHoursUTC });
    });
  });
};

module.exports = {
  getGeocodeInfo,
  getElevationInfo,
  getTimezoneInfo
};