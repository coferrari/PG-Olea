const bcrypt = require("bcrypt");
const { User } = require("../src/db");

const userMockUp = async () => {
  // --- Users ---
  const hashedPasswordA = await bcrypt.hash("123Usuario", 12);
  try {
    await User.create({
      name: "Probando Usuario",
      username: "usuario1",
      email: "user@email.com",
      password: hashedPasswordA,
      contact: "02201236969",
      coins: 10,
    });
  } catch (e) {
    console.log(e.message);
  }
};

const adminMockUp = async () => {
  // --- Admin ---
  const hashedPasswordB = await bcrypt.hash("Henry2021", 12);
  try {
    await User.create({
      name: "Olea",
      surname: "Proyecto",
      username: "olea",
      isAdmin: true,
      email: "oleaproyecto@gmail.com",
      password: hashedPasswordB,
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  userMockUp,
  adminMockUp,
};
