const { Turn, User, Order, Product } = require("../db.js");
const { getTemplateProductLetter } = require("../helpers/mail.js");
const Modelo = require("./index.js");

var id = 0;
class TurnModel extends Modelo {
  constructor(model) {
    super(model);
  }
  create = async (req, res, next) => {
    try {
      const { store, date, hour } = req.body;
      const newTurn = await this.model.create({
        id: id,
        store,
        date,
        hour,
      });
      return res.send("Nuevo turno creado");
    } catch (error) {
      res.status(400).send("No se pudo crear el turno");
    }
  };
  //   getByStore = async (req, res, next) => {
  //     try {
  //       const { store } = req.body;

  //       const turns = await this.model.findAll({
  //         where: { store },
  //       });
  //       return res.send(turns);
  //     } catch (err) {
  //       next(err);
  //     }
  //   };
  //   assignTurn = async (req, res, next) => {
  //       const { username, store, date, hour } = req.body;
  //       try {
  //         const user = await User.findOne({
  //             where: {
  //                 username
  //             }
  //         })
  //         const turn = await this.model.findOne({
  //             where: {
  //                 store,
  //                 date,
  //                 hour
  //             }
  //         })
  //         user.setTurn(turn.dataValues.id);
  //         await turn.increment({
  //             full: +1
  //         })
  //         turn.save();
  //         return res.send("Turno asignado");
  //       } catch (error){
  //           next(error);
  //       }
  //   };
  cancelTurn = async (req, res, next) => {
    console.log(req.body, "este es el body");
    const { orderId, store, date, hour } = req.body;
    try {
      console.log("entro al try");
      const order = await Order.findOne({
        where: {
          id: orderId,
        },
      });
      console.log(orderId);
      const turn = await this.model.findOne({
        where: {
          store,
          date,
          hour,
        },
      });
      await order.update({
        turnId: null,
      });
      await turn.increment({
        full: -1,
      });
      turn.save();
      return res.send("Turno cancelado");
    } catch (error) {
      console.log("entro al catch");
      next(error);
    }
  };

  getTurnByUser = async (req, res, next) => {
    const { username } = req.params;
    try {
      let order = await Order.findAll({
        where: {
          userUsername: username,
        },
        include: Product,
      });
      order = order.find((o) => o.turnId !== null && o.status !== "finalizada");
      if (order) {
        const turn = await this.model.findOne({
          where: {
            id: order.turnId,
          },
        });
        return res.send([order, turn]);
      }
      res.send("No se han encontrado turnos");
    } catch (error) {
      next(error);
    }
  };
}

const turnControllers = new TurnModel(Turn);

module.exports = turnControllers;
