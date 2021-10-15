const getRandomInt = () => {
  return Math.floor(Math.random() * (100000 - 10000 + 1)) + 1000;
};
module.exports = getRandomInt;
