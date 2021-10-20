const { Stores } = require("../src/db");

const storesMockUp = async () => {
  await Stores.create({
    address: "Garibaldi 283 Coronel Suarez",
    location: [-37.457917746938776, -61.93762877142857],
  });
};
module.exports = storesMockUp;
