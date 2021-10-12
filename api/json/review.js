const { Reviews } = require("../src/db");
const reviewsMockUp = async () => {
  const n1 = await Reviews.create({
    productId: 1,
    comment: "muy bueno la verdad que espectacular",
    rating: 5,
    opinion: "genial",
  });
  n1.setUser("Toni");
  const n2 = await Reviews.create({
    productId: 1,
    comment: "es malisimo este producto!",
    rating: 1,
    opinion: "malo",
  });
  n2.setUser("Elena");
  const n3 = await Reviews.create({
    productId: 1,
    comment: "algo muy util realmente me sirvio muchas gracias",
    rating: 4,
    opinion: "normal",
  });
  n3.setUser("Franco");
  const n4 = await Reviews.create({
    productId: 1,
    comment: "algo muy util realmente me sirvio muchas gracias",
    rating: 4,
    opinion: "normal",
  });
  n4.setUser("Dibu");
  const n5 = await Reviews.create({
    productId: 1,
    comment: "algo muy util realmente me sirvio muchas gracias",
    rating: 4,
    opinion: "normal",
  });
  n5.setUser("Elena");
};
module.exports = reviewsMockUp;
