const { User, Carrito, Product } = require("../db.js");
const { encryptPassword, comparePassword } = require("../helpers/index");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "699731210579-fq1sd4ijgh6ph842rlc3f0rf86eftdgh.apps.googleusercontent.com"
);
const getRandomInt = require("../helpers/getRandom");
const {
  getTemplate,
  sendEmail,
  getTemplateChangePassword,
  getTemplateAuthenticationAdmin,
} = require("../helpers/mail");
const { use } = require("../routes/user.js");
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
      await user.save();
      return res.send("nueva contraseña guardada");
    }
    res.status(404).send("err");
  } catch (err) {
    next(err);
  }
};

userFunction.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailFind = await User.findOne({ where: { email } });
    if (emailFind.admin) {
      const code = getRandomInt();
      const template = getTemplateAuthenticationAdmin(email, code);
      await sendEmail(email, "Codigo de confirmación", template);
      emailFind.codeVerification = code;
      emailFind.save();
      return res.json({
        username: emailFind.username,
        msg: "Debe revisar el codigo que se le envio al mail",
      });
    } else {
      const token = jwt.sign(
        {
          name: emailFind.name,
          surname: emailFind.surname,
          username: emailFind.username,
          admin: emailFind.admin,
          email: emailFind.email,
          picture: emailFind.picture,
          adress: emailFind.adress,
          phone: emailFind.phone,
        },
        process.env.TOKEN_SECRET
      );
      return res.header("auth-token", token).json({
        error: null,
        data: { token },
      });
    }
  } catch (err) {
    next(err);
  }
};
userFunction.authenticateLogin = async (req, res, next) => {
  const { code, username } = req.body;
  console.log("aca");
  console.log(req.body);
  try {
    const userAdmin = await User.findByPk(username);
    console.log(userAdmin.codeVerification, code);
    if (userAdmin.codeVerification !== parseInt(code))
      return res.json({
        msg: "Su codigo es incorrecto o expiro",
      });
    if (!userAdmin.codeVerification)
      return res.json({
        msg: "Su codigo es incorrecto o expiro",
      });
    const token = jwt.sign(
      {
        name: userAdmin.name,
        surname: userAdmin.surname,
        username: userAdmin.username,
        admin: userAdmin.admin,
        email: userAdmin.email,
        picture: userAdmin.picture,
        adress: userAdmin.adress,
        phone: userAdmin.phone,
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
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { given_name, family_name, email, picture, at_hash } =
      ticket.getPayload();
    const user = await User.findOne({
      where: { email },
      include: Carrito,
    });

    if (user === null) {
      const carritocreado = await Carrito.create({});
      const newPasswordEncrypted = await encryptPassword(at_hash);
      const newUser = await User.create({
        name: given_name,
        username: email,
        password: newPasswordEncrypted,
        email: email,
        surname: family_name,
        picture,
        admin: false,
      });
      newUser.setCarrito(carritocreado.dataValues.id);
      const token = jwt.sign(
        {
          name: given_name,
          username: email,
          email: email,
          surname: family_name,
          picture,
          admin: newUser.admin,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      return res.header("auth-token", token).json({
        error: null,
        data: { token },
      });
    }
    if (user) {
      const token = jwt.sign(
        {
          name: given_name,
          username: email,
          email: email,
          surname: family_name,
          picture,
          admin: user.admin,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      return res.header("auth-token", token).json({
        error: null,
        data: {
          token,
        },
      });
    }
  } catch (err) {
    next(err);
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
userFunction.logOut = async (req, res, next) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
userFunction.updateProfile = async (req, res, next) => {
  try {
    const { name, surname, image, phone, adress } = req.body.usuario;

    const { token } = req.body;
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findByPk(verified.username);
    user.picture = image;
    user.name = name;
    user.surname = surname;
    user.phone = phone;
    user.adress = adress;
    user.save();

    const info = jwt.sign(
      {
        name: name,
        username: user.username,
        email: user.email,
        surname: surname,
        picture: image,
        admin: user.admin,
        adress: adress,
        phone: phone,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    return res.header("auth-token", token).json({
      error: null,
      data: {
        token: info,
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = userFunction;
