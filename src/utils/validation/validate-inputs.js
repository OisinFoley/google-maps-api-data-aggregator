module.exports = {
  validateArgs: (args, keys) => {
    let errors = {};
    keys.forEach(key => {
      if (!args[key] || typeof(args[key]) != 'string') {
        errors[key] = 'Cannot be null or empty';
      }
    });
    return errors;
  }
}