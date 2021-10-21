const { User, Product, Category, Wishlist } = require("../db");
const {
  getTemplateProductLetter,
  getTemplateCategoryLetter,
  getTemplateProductLetterWishlist,
} = require("../helpers/mail");
const { sendEmail } = require("../helpers/mail");
const jwt = require("jsonwebtoken");
const newsLetter = {};

newsLetter.getAll = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      where: {
        newsLetter: true,
      },
    });
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
};
newsLetter.sendLetterProduct = async (req, res, next) => {
  const { product, offert, fecha } = req.body;
  try {
    const allUsers = await User.findAll({
      where: {
        newsLetter: true,
      },
    });
    const producto = await Product.findByPk(product);
    for (let i = 0; i < allUsers.length; i++) {
      let name = allUsers[i].name;
      let token = jwt.sign(
        {
          email: allUsers[i].email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      const mail = getTemplateProductLetter(
        name,
        fecha,
        producto.name,
        offert,
        token
      );
      await sendEmail(allUsers[i].email, "Ofertas", mail);
    }
    res.json({ message: "email enviado" });
  } catch (err) {
    next(err);
  }
};
newsLetter.sendCategoryLetter = async (req, res, next) => {
  const { category, offert, fecha } = req.body;
  try {
    const allUsers = await User.findAll({
      where: {
        newsLetter: true,
      },
    });
    const categoria = await Category.findByPk(category);
    for (let i = 0; i < allUsers.length; i++) {
      let name = allUsers[i].name;
      let token = jwt.sign(
        {
          email: allUsers[i].email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      const mail = getTemplateCategoryLetter(
        name,
        fecha,
        categoria.nameCategory,
        offert,
        token
      );
      await sendEmail(allUsers[i].email, "Ofertas", mail);
    }
    res.json({ message: "email enviado" });
  } catch (err) {
    next(err);
  }
};
newsLetter.suscribeNewsLetter = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(403).json({ message: "Usuario no encontrado" });
    }
    user.newsLetter = true;
    user.save();
    return res.send("Se ha suscripto correctamente");
  } catch (err) {
    next(err);
  }
};

newsLetter.sendOffersToWishlistUsers = async (req, res, next) => {
  const { product, offer, fecha } = req.body;
  try {
    const producto = await Product.findByPk(product);
    const wishlists = await Wishlist.findAll({
      include: Product,
    });
    const wishlistFiltered = wishlists.filter((w) =>
      w.products.find((p) => p.id == product)
    );

    for (let i = 0; i < wishlistFiltered.length; i++) {
      const userSuscribe = await User.findOne({
        where: {
          email: wishlistFiltered[i].userEmail,
          newsLetter: true,
        },
      });
      if (userSuscribe) {
        const template = getTemplateProductLetterWishlist(
          userSuscribe.name,
          fecha,
          producto.name,
          offer
        );
        await sendEmail(
          wishlistFiltered[i].userEmail,
          "Tenemos en oferta este producto que te interesa!",
          template
        );
      }
    }
    res.json({ message: "email enviado" });
  } catch (err) {
    next(err);
  }
};

newsLetter.desuscribeNewsLetter = async (req, res, next) => {
  const { token } = req.body;
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ where: { email: verified.email } });
    if (!user) {
      return res.status(403).json({ message: "Usuario no encontrado" });
    }
    user.newsLetter = false;
    user.save();
    return res.send("Se ha anulado su suscripción");
  } catch (err) {
    next(err);
  }
};

module.exports = newsLetter;
