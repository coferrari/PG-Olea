const { Reviews, User, Product } = require("../db.js");
const product = require("../models/product.js");
const Modelo = require("./index.js");

var id = 0;
class ReviewsModel extends Modelo {
  constructor(model) {
    super(model);
  }
  getAll = (req, res, next) => {
    const Reviews = this.model.findAll({
      include: [
        {
          model: Product,
        },

        {
          model: User,
        },
      ],
    });
    Reviews.then((results) => {
      res.send(results);
    }).catch((error) => next(error));
  };

  create = async (req, res, next) => {
    try {
      const { userId, productId, comment, rating } = req.body;
      var newReview = await this.model.create({
        id: id,
        userId,
        productId,
        comment,
        rating,
      });
      await newReview.setUser(userId);
      await newReview.setProduct(productId);
      return res.send("done");
    } catch (error) {
      next(error);
    }
  };
}

const reviewsControllers = new ReviewsModel(Reviews);

module.exports = reviewsControllers;
