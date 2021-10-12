const { Reviews } = require("../src/db");
const reviewsMockUp = async () => {
  const n1 = await Reviews.create({
    productId: 1,
    comment: "muy bueno la verdad que espectacular",
    rating: 5,
    opinion: "genial",
  });
  n1.setUser("usuario3");
  const n2 = await Reviews.create({
    username: "",
    productId: 1,
    comment: "es malisimo este producto!",
    rating: 1,
    opinion: "malo",
  });
  n2.setUser("usuario2");
  const n3 = await Reviews.create({
    productId: 1,
    comment: "algo muy util realmente me sirvio muchas gracias",
    rating: 4,
    opinion: "normal",
  });
  n3.setUser("usuario1");
  const n4 = await Reviews.create({
    productId: 1,
    comment: "algo muy util realmente me sirvio muchas gracias",
    rating: 4,
    opinion: "normal",
  });
  n4.setUser("dylan");
  const n5 = await Reviews.create({
    productId: 1,
    comment: "algo muy util realmente me sirvio muchas gracias",
    rating: 4,
    opinion: "normal",
  });
  n5.setUser("usuario4");
};
module.exports = reviewsMockUp;
