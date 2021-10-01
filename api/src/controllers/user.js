const { User, Carrito, Product } = require("../db.js");
const { encryptPassword, comparePassword } = require("../helpers/index");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "699731210579-fq1sd4ijgh6ph842rlc3f0rf86eftdgh.apps.googleusercontent.com"
);
const nodemailer = require("nodemailer");
const { getTemplate, sendEmail, getTemplateChangePassword } = require("../helpers/mail");
const userFunction = {};

userFunction.register = async (req, res, next) => {
  const { username, password, email, name, surname } = req.body;
  try {
    const userFind = await User.findOne({ where: { username } });
    const encryptedPassword = await encryptPassword(password);

    if (userFind === null) {
      const carritocreado = await Carrito.create({});
      const newUser = await User.create({
        username,
        password: encryptedPassword,
        email,
      });
      newUser.setCarrito(carritocreado.dataValues.id);
      return res.send(`${newUser.username} created`);


    if (!userFind) {
      const token = jwt.sign(
        {
          name: name,
          surname: surname,
          username: username,
          password: encryptedPassword,
          email: email,
          name: name,
          surname: surname,
          admin: false,
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

  const user = await User.create({
    name: verified.name,
    surname: verified.surname,
    username: verified.username,
    password: verified.password,
    email: verified.email,
    name: verified.name,
    surname: verified.surname,
  });
  console.log(user)
  res.send(user);
};

// solicitar validacion de mail para cambio de contraseña
userFunction.requestChangePassword = async (req, res, next) => {
  const { email } = req.body;
  // const user = await User.findOne({ where: email })
  // if (user) {
    const template = getTemplateChangePassword(email);
    await sendEmail(email, "Confirmar cambio de contraseña", template);
    res.send("email enviado");
  // }
}

// para cuando ya esta validado el mail
userFunction.changePassword = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body)

  // const user = await User.findOne({ where: { email } });
  const newPasswordEncrypted = await encryptPassword(password);
  console.log(newPasswordEncrypted)

  // user.password = newPasswordEncrypted;
  res.send("nueva contraseña guardada");
};

userFunction.login = async (req, res, next) => {
  const { email, password } = req.body;
  const emailFind = await User.findOne({ where: { email } });
  if (emailFind === null) return res.send("email no encontrado");
  const compared = await comparePassword(password, emailFind.password);
  if (compared === true) {
    const token = jwt.sign(
      {
        name: emailFind.name,
        surname: emailFind.surname,
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

userFunction.getAll = async (req, res, next) => {
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


module.exports = userFunction;

