const bcrypt = require("bcrypt");
const { User } = require("../src/db");

const userMockUp = async () => {
  const hashedPasswordA = await bcrypt.hash("123Usuario", 12);
  try {
    await User.create({
      name: "Probando Usuario",
      username: "usuario1",
      email: "user@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    await User.create({
      name: "Probando Usuario",
      username: "usuario2",
      email: "user2@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    await User.create({
      name: "Probando Usuario",
      username: "usuario3",
      email: "user3@email.com",
      password: hashedPasswordA,
      admin: false,
    });
    await User.create({
      name: "Probando Usuario",
      username: "usuario4",
      email: "user4@email.com",
      password: hashedPasswordA,
      admin: false,
    });
  } catch (e) {
    console.log(e.message);
  }
};
const adminMockUp = async () => {
  const hashedPasswordB = await bcrypt.hash("Henry2021", 12);
  try {
    await User.create({
      username: "olea",
      name: "Olea",
      surname: "Proyecto",
      isAdmin: true,
      email: "oleaproyecto@gmail.com",
      password: hashedPasswordB,
      admin: true,
    });
    await User.create({
      username: "dylan",
      name: "Dylan",
      surname: "Gavilan",
      isAdmin: true,
      email: "dylans55@hotmail.com",
      password: hashedPasswordB,
      admin: true,
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  userMockUp,
  adminMockUp,
};
