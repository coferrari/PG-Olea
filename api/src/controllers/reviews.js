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
          attributes: ["username", "name"],
        },
      ],
    });
    Reviews.then((results) => {
      res.send(results);
    }).catch((error) => next(error));
  };

  create = async (req, res, next) => {
    try {
      const { username, productId, comment, rating } = req.body;
      var newReview = await this.model.create({
        id: id,
        username,
        productId,
        comment,
        rating,
      });
      await newReview.setUser(username);

      return res.send(newReview);
    } catch (error) {
      next(error);
    }
  };
  getByProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const reviews = await this.model.findAll({
        where: { productId: id },
      });
      res.send(reviews);
    } catch (err) {
      next(err);
    }
  };
}

const reviewsControllers = new ReviewsModel(Reviews);

module.exports = reviewsControllers;
