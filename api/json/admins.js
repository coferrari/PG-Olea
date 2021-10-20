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

    const wishlistfranco = await Wishlist.create({});
    franco.setCarrito(carritocreado.dataValues.id);
    franco.setWishlist(wishlistfranco.dataValues.id);
    const dibu = await User.create({
      name: "Probando Usuario",
      username: "Dibu",
      email: "user2@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    const carritodibu = await Carrito.create({});

    const wishlistdibu = await Wishlist.create({});
    dibu.setCarrito(carritodibu.dataValues.id);
    dibu.setWishlist(wishlistdibu.dataValues.id);
    const elena = await User.create({
      name: "Probando Usuario",
      username: "Elena",
      email: "user3@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    const carritoElena = await Carrito.create({});
    const wishlistelena = await Wishlist.create({});
    elena.setWishlist(wishlistelena.dataValues.id);
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
      picture:
        "https://instagram.fcsz2-1.fna.fbcdn.net/v/t51.2885-15/e35/130216063_425321335307878_1007044463125293714_n.jpg?_nc_ht=instagram.fcsz2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=oLltUDV-viQAX8Pcw92&edm=AP_V10EBAAAA&ccb=7-4&oh=c4e7c432db068d2eceba80b35027a39b&oe=61771227&_nc_sid=4f375e",
      admin: true,
    });
    const wishlistolea = await Wishlist.create({});
    const carritoolea = await Carrito.create({});
    olea.setCarrito(carritoolea.dataValues.id);
    olea.setWishlist(wishlistolea.dataValues.id);
    const dylan = await User.create({
      username: "dylan",
      name: "Dylan",
      surname: "Gavilan",
      isAdmin: true,
      email: "dylans55@hotmail.com",
      password: hashedPasswordB,
      admin: true,
      newsLetter: true,
    });
    const wishlistdylan = await Wishlist.create({});
    const carritodylan = await Carrito.create({});
    dylan.setCarrito(carritodylan.dataValues.id);
    dylan.setWishlist(wishlistdylan.dataValues.id);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  userMockUp,
  adminMockUp,
};
