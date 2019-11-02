const request = require('request');
const {
  buildGeocodeInfoUrl, buildElevationInfoUrl, buildTimezoneInfoUrl
} = require('../utils/build-url');
const {
  extractLatAndLngFromResponse, extractElevationFromResponse, extractTimezoneFromResponse
} = require('../utils/extractors');

getGeocodeInfo = (elevationArgs) => {
  const requestUrl = buildGeocodeInfoUrl(elevationArgs);
  
  return new Promise((resolve, reject) => {
    request.get(requestUrl, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      let { lat, lng } = extractLatAndLngFromResponse(body);
      resolve({ lat, lng });
    });
  });
}

getElevationInfo = (lat, lng) => {
  const requestUrl = buildElevationInfoUrl(lat, lng);

  return new Promise((resolve, reject) => {
    request.get(requestUrl, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      let { elevation } = extractElevationFromResponse(body);
      resolve({ elevation });
    });
  });
};

getTimezoneInfo = (lat, lng) => {
  const requestUrl = buildTimezoneInfoUrl(lat, lng);
  return new Promise((resolve, reject) => {
    request.get(requestUrl, (err, res, body) => {
      if (err) {
        return reject(err);
      }

      let { timeZoneId, offsetHoursUTC } = extractTimezoneFromResponse(body);
      resolve({ timeZoneId, offsetHoursUTC });
    });
  });
};

module.exports = {
  getGeocodeInfo,
  getElevationInfo,
  getTimezoneInfo
};