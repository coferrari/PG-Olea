const { User, Product, Category } = require("../db");
const {
  getTemplateProductLetter,
  getTemplateCategoryLetter,
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

module.exports = newsLetter;
