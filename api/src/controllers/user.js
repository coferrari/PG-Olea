const { User } = require("../db.js");
const { encryptPassword, comparePassword } = require("../helpers/index");
const jwt = require("jsonwebtoken");
const userFunction = {};

userFunction.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const encryptedPassword = await encryptPassword(password);
    const userFind = await User.findOne({ where: { username } });
    if (userFind === null) {
      const newUser = await User.create({
        username,
        password: encryptedPassword,
        email,
      });
      return res.send(`${newUser.username} created`);
    }
    return res.send("Este usuario existe en la base de datos");
  } catch (err) {
    next(err);
  }
};
userFunction.login = async (req, res, next) => {
  const { email, password } = req.body;
  const emailFind = await User.findOne({ where: { email } });
  if (emailFind === null) return res.send("email no encontrado");
  const compared = await comparePassword(password, emailFind.password);
  if (compared === true) {
    const token = jwt.sign(
      {
        username: emailFind.username,
      },
      process.env.TOKEN_SECRET
    );
    return res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  }
  return res.send("password incorrecta");
};
userFunction.changePassword = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const newPasswordEncrypted = await encryptPassword(password);
  user.password = newPasswordEncrypted;
  res.send("nueva contraseña guardada");
};
userFunction.getAll = async (req, res, next) => {
  const users = await User.findAll();
  try {
    res.send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = userFunction;
