const { Product, category } = require("../db.js");
const Modelo = require("./index.js");

class ProductModel extends Modelo {
    constructor(model) {
        super(model);
    }

    create = async (req, res, next) => {
        try {
            const { name, price, image, description, rating, quantity, category } = req.body;
            let newProduct = await this.model.create({
                name,
                price,
                image,
                description,
                rating,
                quantity,
                id: id
            })
            await newProduct.addCategory(category)
            res.send(newProduct)
        } catch (error) {
            next(error);
        }
    }

        orderByPrice = async (req, res, next) => {
            const { price } = req.params;
            console.log(price)
            if (price === "ASC") {
                try {
                    const orderPrice = await this.model.findAll({
                        order: [["price", "ASC"]]
                    })
                    res.status(200).send(orderPrice)
                } catch (err) {
                    next(err);
                }
            } else if (price === "DES") {
                try {
                    const orderPrice = await this.model.findAll({
                        order: [["price", "DESC"]]
                    })
                    res.status(200).send(orderPrice)
                } catch (err) {
                    next(err);
                }
            }
        }
        orderByName = async (req, res, next) => {
            const { name } = req.params;
            if (name === "ASC") {
                try {
                    const orderAZ = await this.model.findAll({
                        order: [["name", "ASC"]]
                    })
                    res.status(200).send(orderAZ)
                } catch (err) {
                    next(err);
                }
            } else if (name === "DES") {
                try {
                    const orderZA = await this.model.findAll({
                        order: [["name", "DESC"]]
                    })
                    res.status(200).send(orderZA)
                } catch (err) {
                    next(err);
                }
            }
        }
        orderByRating = async (req, res, next) => {
            const { rating } = req.params;
            if (rating === "ASC") {
                try {
                    const orderRating = await this.model.findAll({
                        order: [["rating", "ASC"]]
                    })
                    res.status(200).send(orderRating)
                } catch (err) {
                    next(err);
                }
            } else if (rating === "DES") {
                try {
                    const orderRating = await this.model.findAll({
                        order: [["rating", "DESC"]]
                    })
                    res.status(200).send(orderRating)
                } catch (err) {
                    next(err);
                }
            }
        }

    }

const productControllers = new ProductModel(Product);

module.exports = productControllers;
