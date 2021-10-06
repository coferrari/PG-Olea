const { User, Carrito, Product } = require("../db.js");
const { encryptPassword, comparePassword } = require("../helpers/index");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "699731210579-fq1sd4ijgh6ph842rlc3f0rf86eftdgh.apps.googleusercontent.com"
);
const nodemailer = require("nodemailer");
const {
  getTemplate,
  sendEmail,
  getTemplateChangePassword,
} = require("../helpers/mail");
const userFunction = {};

userFunction.register = async (req, res, next) => {
  const { username, password, email, name, surname } = req.body;
  try {
    const userFind = await User.findOne({ where: { username } });
    const encryptedPassword = await encryptPassword(password);
    const token = jwt.sign(
      {
        name: name,
        surname: surname,
        username: username,
        password: encryptedPassword,
        email: email,
        admin: false,
      },
      process.env.TOKEN_SECRET
    );
    const template = getTemplate(username, token);
    await sendEmail(email, "Confirmar registro", template);
    return res.send("email enviado");
  } catch (err) {
    next(err);
  }
};

userFunction.confirmRegister = async (req, res, next) => {
  const { token } = req.body;
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const carritocreado = await Carrito.create({});
  const user = await User.create({
    name: verified.name,
    surname: verified.surname,
    username: verified.username,
    password: verified.password,
    email: verified.email,
    admin: false,
  });
  user.setCarrito(carritocreado.dataValues.id);
  res.send(user);
};

userFunction.requestChangePassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.TOKEN_SECRET
    );
    if (user) {
      const template = getTemplateChangePassword(email, token);
      await sendEmail(email, "Confirmar cambio de contraseña", template);
      res.send("email enviado");
    }
  } catch (err) {
    next(err);
  }
};

userFunction.changePassword = async (req, res, next) => {
  const { email, password, token } = req.body;
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ where: { email } });
    if (user.email === verified.email) {
      const newPasswordEncrypted = await encryptPassword(password);
      user.password = newPasswordEncrypted;
      console.log("entre");
      await user.save();
      return res.send("nueva contraseña guardada");
    }
    res.status(404).send("err");
  } catch (err) {
    console.log("entre al error");
    next(err);
  }
};

userFunction.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailFind = await User.findOne({ where: { email } });
    const token = jwt.sign(
      {
        name: emailFind.name,
        surname: emailFind.surname,
        username: emailFind.username,
        admin: emailFind.admin,
      },
      process.env.TOKEN_SECRET
    );
    return res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (err) {
    next(err);
  }
};

userFunction.getAll = async (req, res, next) => {
  console.log("llegue");
  const users = await User.findAll({
    include: Carrito,
  });
  try {
    res.send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

userFunction.googleLogin = async (req, res, next) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, given_name, family_name, email, picture, at_hash } =
    ticket.getPayload();
  const user = await User.findOne({
    where: { email },
  });
  console.log(ticket);
  if (user === null) {
    const newPasswordEncrypted = await encryptPassword(at_hash);
    const newUser = await User.create({
      name: given_name,
      username: email,
      password: newPasswordEncrypted,
      email: email,
      surname: family_name,
      picture,
    });
    const token = jwt.sign(
      {
        username: email,
      },
      process.env.TOKEN_SECRET
    );
    return res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  }
  if (user) {
    const token = jwt.sign({ username: email }, process.env.TOKEN_SECRET);
    return res.header("auth-token", token).json({
      error: null,
      data: {
        token,
      },
    });
  }
};
userFunction.createAdmin = async (req, res, next) => {
  const { username, password, admin, email } = req.body;
  const newPassword = await encryptPassword(password);
  User.create({
    username,
    password,
    email,
    password: newPassword,
    admin,
  });
};

module.exports = userFunction;
