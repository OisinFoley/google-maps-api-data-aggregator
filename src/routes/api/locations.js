const express = require('express');
const router = express.Router();
const validationKeys = require('../../utils/validation-keys');
const { validateArgs } = require('../../utils/validate-inputs');
const { objectIsEmpty } = require('../../utils/object-is-empty');

// @route POST api/locations
// @desc tests locations route
// @access Public

router.post('/', (req, res, next) => {
  let reqBodyArgs = {...req.body};
  let errors = validateArgs(reqBodyArgs, validationKeys);
  
  if (!objectIsEmpty(errors)) {
    // res.status(400).json(errors)
    return next(errors);
  };

  res.status(200).json({ test: 'test valid response'});
});

module.exports = router;