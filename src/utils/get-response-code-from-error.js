module.exports = (err) => {
  switch (true) {
    case err.hasOwnProperty('street'):
    case err.hasOwnProperty('city'):
    case err.hasOwnProperty('state'):
    case err.hasOwnProperty('country'):
      return 400;
    default:
      return 500;
  }
};