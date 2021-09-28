const { User } = require("../db.js");
const encryptPassword = require("../helpers/index");
const userFunction = {};

userFunction.signUp = async (req, res) => {
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
    res.status(400).send(err.message);
  }
};
module.exports = userFunction;
