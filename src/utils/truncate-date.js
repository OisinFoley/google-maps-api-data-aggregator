module.exports = () => {
  let time = Date.now().toString();
  return time.substr(0, time.length - 1);
}