const express = require('express');
const router = express.Router();
const validationKeys = require('../../utils/validation-keys');
const { validateArgs } = require('../../utils/validate-inputs');
const { objectIsEmpty } = require('../../utils/object-is-empty');
const { getGeocodeInfo, getElevationInfo, getTimezoneInfo } = require('../../services/location-info');

// @route POST api/locations
// @desc tests locations route
// @access Public

router.post('/', (req, res, next) => {
  let reqBodyArgs = {...req.body};
  let errors = validateArgs(reqBodyArgs, validationKeys);
  let promises = [];
  
  if (!objectIsEmpty(errors)) {
    return next(errors);
  };

  getGeocodeInfo(reqBodyArgs)
    .then(data => {
      const { lat, lng } = data;
      // both funcs return a promise, allowing us to call Promise.all further down
      promises.push(getElevationInfo(lat, lng), getTimezoneInfo(lat, lng));

      Promise.all(promises)
        .then(data => {
            // destructuring for data[0].elevation and
            // data[1].timeZoneId, data[1].offsetHoursUTC
            let [ { elevation }, { timeZoneId, offsetHoursUTC } ] = data;
            let responseData = {
              lat, lng, elevation, timeZoneId, offsetHoursUTC
            };
            res.json({ data: responseData })
        })
        .catch(e => {
          next(e);
        });
    }).catch(err => {
      next(err);
    });
});

module.exports = router;