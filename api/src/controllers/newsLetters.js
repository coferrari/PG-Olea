const { User } = require("../db");
const { getTemplateProductLetter } = require("../helpers/mail");
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
  try {
    const allUsers = await User.findAll({
      where: {
        newsLetter: true,
      },
    });
    for (let i = 0; i < allUsers.length; i++) {
      let name = allUsers[i].name;
      const mail = getTemplateProductLetter(name, fecha, product, offert);
      await sendEmail(allUsers[i].email, "Ofertas", mail);
    }
    res.json({ message: "email enviado" });
  } catch (err) {
    next(err);
  }
};

module.exports = newsLetter;
