module.exports = {
  extractLatAndLngFromResponse : (body) => {
    let lat, lng;
    body = JSON.parse(body);
    if (body.results && body.results.length > 0) {
      let [results] = body.results;
      let { 
        geometry : { location }
      } = results;
      ({ lat, lng } = location);
    }

    return { lat, lng };
  },

  extractElevationFromResponse: (body) => {
    let elevation;
    body = JSON.parse(body);
    if (body.results && body.results.length > 0) {
      let [results] = body.results;
      ({ elevation } = results);
    }
    return { elevation };
  },

  extractTimezoneFromResponse: (body) => {
    let timeZoneId, rawOffset;
    let offsetHoursUTC;
    body = JSON.parse(body);
      ({ timeZoneId, rawOffset } = body);
      offsetHoursUTC = rawOffset / 3600;
    return { timeZoneId, offsetHoursUTC };
  }
}