const bcrypt = require("bcrypt");
const { User, Carrito } = require("../src/db");

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
   // const wishlistfranco = await Wishlist.create({});
    franco.setCarrito(carritocreado.dataValues.id);
    //franco.setWishlist(wishlistfranco.dataValues.id);

    const dibu = await User.create({
      name: "Probando Usuario",
      username: "Dibu",
      email: "user2@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    const carritodibu = await Carrito.create({});
    //const wishlistdibu = await Wishlist.create({});
    dibu.setCarrito(carritodibu.dataValues.id);
    //dibu.setWishlist(wishlistdibu.dataValues.id);

    const elena = await User.create({
      name: "Probando Usuario",
      username: "Elena",
      email: "user3@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    const carritoElena = await Carrito.create({});
   // const wishlistelena = await Wishlist.create({});
   // elena.setWishlist(wishlistelena.dataValues.id);
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
    //const wishlistolea = await Wishlist.create({});
    const carritoolea = await Carrito.create({});
    olea.setCarrito(carritoolea.dataValues.id);
    //olea.setWishlist(wishlistolea.dataValues.id);
    const dylan = await User.create({
      username: "dylan",
      name: "Dylan",
      surname: "Gavilan",
      isAdmin: true,
      email: "dylans55@hotmail.com",
      password: hashedPasswordB,
      admin: true,
    });
    //const wishlistdylan = await Wishlist.create({});
    const carritodylan = await Carrito.create({});
    dylan.setCarrito(carritodylan.dataValues.id);
    //dylan.setWishlist(wishlistdylan.dataValues.id);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  userMockUp,
  adminMockUp,
};
