const { Order } = require("../src/db");

const ordersMockUp = async () => {
  try {
    await Order.create({
      username: "user1",
      price: 1200,
      products: [
        { id: 1, quantity: 4 },
        { id: 2, quantity: 3 },
        { id: 3, quantity: 3 },
      ],
      addresNum: 421,
      addres: "lujan",
    });
    await Order.create({
      username: "user2",
      price: 1500,
      products: [
        { id: 1, quantity: 4 },
        { id: 2, quantity: 3 },
        { id: 3, quantity: 3 },
      ],
      status: "procesando",
      addresNum: 421,
      addres: "lujan",
    });
    await Order.create({
      username: "user3",
      price: 1400,
      products: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
        { id: 3, quantity: 3 },
      ],
      addresNum: 421,
      addres: "lujan",
    });
    await Order.create({
      userUsername: "user2",
      price: 3000,
      products: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
        { id: 3, quantity: 3 },
      ],
      addresNum: 421,
      addres: "lujan",
    });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = ordersMockUp;
