const { User } = require("../db");
const { getTemplateProductLetter } = require("../helpers/mail");
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
  getTemplateProductLetter;
};
newsLetter.sendLetterCategory = async (req, res, next) => {};
