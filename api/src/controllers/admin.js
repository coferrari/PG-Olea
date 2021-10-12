const { User } = require("../db.js");
const adminFunction = {};
const {
  getTemplateAdminChangePassword,
  sendEmail,
} = require("../helpers/mail.js");
adminFunction.changePassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    const template = getTemplateAdminChangePassword(user.name);
    await sendEmail(email, "Cambio de contraseña requerido", template);
    return res.send("email enviado");
  }
  return res.send("email no encontrado");
};
adminFunction.deleteUser = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.destroy({ where: { username } });

    res.send("usuario eliminado correctamente");
  } catch (err) {
    next(err);
  }
};
adminFunction.generateAdmin = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.update(
      { admin: true },
      {
        where: {
          username,
        },
      }
    );
    res.send("este usuario ahora es admin");
  } catch (err) {
    next(err);
  }
};
module.exports = adminFunction;
