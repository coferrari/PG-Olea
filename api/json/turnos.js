const { Turn } = require("../src/db");

const turnMockUp = async () => {
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-20",
    hour: "10:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-20",
    hour: "11:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-20",
    hour: "12:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-20",
    hour: "13:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-20",
    hour: "14:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-20",
    hour: "15:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-20",
    hour: "17:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-20",
    hour: "16:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-21",
    hour: "10:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-21",
    hour: "11:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-21",
    hour: "12:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-21",
    hour: "13:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-21",
    hour: "14:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-21",
    hour: "15:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-21",
    hour: "17:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-21",
    hour: "16:00 hs",
  });
};
module.exports = storesMockUp;
