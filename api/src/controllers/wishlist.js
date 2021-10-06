const { Wishlist, Product } = require("../db.js");
const Modelo = require("./index.js");

class WishlistModel extends Modelo {
  constructor(model) {
    super(model);
  }
  getWishlist = async (req, res, next) => {
    try {
      const { username } = req.body; 
      const wishlist = await Wishlist.findAll({
        where : {
          userUsername: username
        }, include: Product,
      });
      return res.json(wishlist);
    } catch (error) {
      next(error);
    }
  };
  addProductToWishlist = async (req, res, next) => {
    try {
      const { username, productId } = req.body; 
      const wishlist = await Wishlist.findOne({
        where : {
          userUsername : username
        },
      });
      await wishlist.addProducts(productId);
      return res.send('done');
    } catch (error) {
      next(error);
    }
  };
  removeProductToWishlist = async (req, res, next) => {
    try {
      const { username, productId } = req.body; 
      const wishlist = await Wishlist.findOne({
        where : {
          userUsername : username
        },
      });
      await wishlist.removeProducts(productId);
      return res.json('done');
    } catch (error) {
      next(error);
    }
  };
}

const wishlistControllers = new WishlistModel(Wishlist);

module.exports = wishlistControllers;