const { User } = require("../../db");
const { comparePassword } = require("../../helpers/index");
const checkDuplicate = async (req, res, next) => {
  const { username, email } = req.body;
  const usernameDuplicated = await User.findOne({ where: { username } });
  if (usernameDuplicated) {
    return res.status(401).send("este username ya existe");
  }
  const emailDuplicated = await User.findOne({ where: { email } });
  if (emailDuplicated) {
    return res.status(401).json({ message: "este email ya esta registrado" });
  }
  next();
};
const checkEmailAndPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const emailExiste = await User.findOne({ where: { email } });
  if (!emailExiste) {
    return res
      .status(401)
      .json({ message: "este email no pertenece a ningun usuario" });
  }
  const compared = await comparePassword(password, emailExiste.password);
  if (!compared)
    return res.status(401).json({ message: "contraseña incorrecta" });
  next();
};
const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailExiste = await User.findOne({ where: { email } });
  if (!emailExiste) {
    return res.status(404).send("este email no pertenece a ningun usuario");
  }
  next();
};
module.exports = { checkDuplicate, checkEmailAndPassword, checkEmail };
