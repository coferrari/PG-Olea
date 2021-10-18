const { User, Product, Category, Wishlist } = require("../db");
const {
  getTemplateProductLetter,
  getTemplateCategoryLetter,
  getTemplateProductLetterWishlist
} = require("../helpers/mail");
const { sendEmail } = require("../helpers/mail");
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
  console.log(req.body);
  try {
    const allUsers = await User.findAll({
      where: {
        newsLetter: true,
      },
    });
    const producto = await Product.findByPk(product);
    for (let i = 0; i < allUsers.length; i++) {
      let name = allUsers[i].name;
      const mail = getTemplateProductLetter(name, fecha, producto.name, offert);
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
      const mail = getTemplateCategoryLetter(
        name,
        fecha,
        categoria.nameCategory,
        offert
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
  console.log(req.body);
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
  console.log("este es el body", req.body);
  try {
    const producto = await Product.findByPk(product);
    console.log("este es el producto" , producto);
    const wishlists = await Wishlist.findAll({
      include: Product
    })
    console.log("todas las wishlist", wishlists);
    const wishlistFiltered = wishlists.filter(w => w.products.find(p => p.id == product));
    console.log("wishlist filtrada" , wishlistFiltered);
    for (let i=0; i < wishlistFiltered.length; i++){
      const userSuscribe = await User.findOne({
        where: {
          email: wishlistFiltered[i].userEmail,
          newsLetter: true
        }
      })
      console.log("usuario suscripto", userSuscribe);
      if (userSuscribe){
        const template = getTemplateProductLetterWishlist(userSuscribe.name, fecha, producto.name, offer);
        await sendEmail(wishlistFiltered[i].userEmail, "Tenemos en oferta este producto que te interesa!", template);
      }
    }
    res.json({ message: "email enviado" });
  } catch (err) {
    next(err);
  }
};

module.exports = newsLetter;

