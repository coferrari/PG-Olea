const { Category } = require("../src/db");
const categoryMockUp = async () => {
  try {
    await Category.create({
      nameCategory: "Decoracion",
    });
    await Category.create({
      nameCategory: "Cosmetica",
    });
    await Category.create({
      nameCategory: "Almacen",
    });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = categoryMockUp;
