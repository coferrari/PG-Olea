const { User } = require("../../db");
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.username);
    if (user.admin === true) {
      next();
    }
    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
module.exports = isAdmin;
