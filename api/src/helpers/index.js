const bcrypt = require("bcrypt");
const saltRounds = 10;
async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
}
module.exports = encryptPassword;
