const express = require('express');
const bodyParser = require('body-parser');
const locations = require('./routes/api/locations');
const getResponseCodeFromError = require('./utils/get-response-code-from-error');

let app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/locations', locations);

app.use((err, req, res, next) => {
  console.log(`Error: on request to ${req.headers.origin}${req.url}`);
  console.log(JSON.stringify(err));

  const statusCode = getResponseCodeFromError(err);
  res.status(statusCode).json(err);
});

module.exports = app;