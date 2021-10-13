const bcrypt = require("bcrypt");
const { User, Carrito, Wishlist } = require("../src/db");

const userMockUp = async () => {
  const hashedPasswordA = await bcrypt.hash("123Usuario", 12);
  try {
    const franco = await User.create({
      name: "Probando Usuario",
      username: "Franco",
      email: "user@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    const carritocreado = await Carrito.create({});

    franco.setCarrito(carritocreado.dataValues.id);
    const dibu = await User.create({
      name: "Probando Usuario",
      username: "Dibu",
      email: "user2@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    const carritodibu = await Carrito.create({});
    dibu.setCarrito(carritodibu.dataValues.id);
    const elena = await User.create({
      name: "Probando Usuario",
      username: "Elena",
      email: "user3@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    const carritoElena = await Carrito.create({});
    elena.setCarrito(carritoElena.dataValues.id);
  } catch (e) {
    console.log(e.message);
  }
};
const adminMockUp = async () => {
  const hashedPasswordB = await bcrypt.hash("Henry2021", 12);
  try {
    const olea = await User.create({
      username: "olea",
      name: "Olea",
      surname: "Proyecto",
      isAdmin: true,
      email: "oleaproyecto@gmail.com",
      password: hashedPasswordB,
      admin: true,
    });
    const carritoolea = await Carrito.create({});
    olea.setCarrito(carritoolea.dataValues.id);
    const dylan = await User.create({
      username: "dylan",
      name: "Dylan",
      surname: "Gavilan",
      isAdmin: true,
      email: "dylans55@hotmail.com",
      password: hashedPasswordB,
      admin: true,
    });
    const carritodylan = await Carrito.create({});
    dylan.setCarrito(carritodylan.dataValues.id);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  userMockUp,
  adminMockUp,
};
