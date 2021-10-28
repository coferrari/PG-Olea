const { Turn } = require("../src/db");

const turnMockUp = async () => {
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-29",
    hour: "10:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-29",
    hour: "11:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-29",
    hour: "12:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-29",
    hour: "13:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-29",
    hour: "14:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-29",
    hour: "15:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-29",
    hour: "17:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-29",
    hour: "16:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-31",
    hour: "10:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-31",
    hour: "11:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-31",
    hour: "12:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-31",
    hour: "13:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-31",
    hour: "14:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-31",
    hour: "15:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-31",
    hour: "17:00 hs",
  });
  await Turn.create({
    store: "Garibaldi 283 Coronel Suarez",
    date: "2021-10-31",
    hour: "16:00 hs",
  });
};
module.exports = turnMockUp;
