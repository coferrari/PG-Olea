const { User } = require("../../db");
const { encryptPassword, comparePassword } = require("../../helpers/index");
const checkDuplicate = async (req, res, next) => {
  const { username, email } = req.body;
  const usernameDuplicated = await User.findOne({ where: { username } });
  if (usernameDuplicated) {
    return res.status(401).send("este username ya existe");
  }
  const emailDuplicated = await User.findOne({ where: { email } });
  if (emailDuplicated) {
    return res.status(401).send("este email ya esta registrado");
  }
  next();
};
const checkEmailAndPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const emailExiste = await User.findOne({ where: { email } });
  if (!emailExiste) {
    return res.status(401).send("este email no pertenece a ningun usuario");
  }
  const compared = await comparePassword(password, emailExiste.password);
  if (!compared) return res.status(401).send("contraseña incorrecta");
  next();
};
module.exports = { checkDuplicate, checkEmailAndPassword };
