const { User } = require("../db.js");
const { encryptPassword, comparePassword } = require("../helpers/index");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "699731210579-fq1sd4ijgh6ph842rlc3f0rf86eftdgh.apps.googleusercontent.com"
);
const nodemailer = require("nodemailer");
const { getTemplate, sendEmail } = require("../helpers/mail");
const userFunction = {};

userFunction.register = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const userFind = await User.findOne({ where: { username } });
    if (!userFind) {
      const token = jwt.sign(
        {
          username: username,
          password: password,
          email: email,
        },
        process.env.TOKEN_SECRET
      );
      const template = getTemplate(username, token);
      await sendEmail(email, "Confirmar registro", template);
      res.send("email enviado");
    }
    if (userFind) res.status(304).send("este email ya esta registrado");
  } catch (err) {
    next(err);
  }
};
userFunction.confirmRegister = async (req, res, next) => {
  const { token } = req.body;
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const encryptedPassword = await encryptPassword(verified.password);
  const user = await User.create({
    username: verified.username,
    password: encryptedPassword,
    email: verified.email,
  });
  res.send(user);
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
userFunction.googleRegister = async (req, res, next) => {};

module.exports = userFunction;
