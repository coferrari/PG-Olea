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
  getAvailableTurns = async (req, res, next) => {
    try {
      const actualDate = new Date().toJSON().slice(0,10);
      let turns = await this.model.findAll();
      turns = turns.filter(t => {
        const date = t.date.split(" ");
        const formatDate = new Date(date).toJSON().slice(0,10);
        if (t.full < 10 && formatDate >= actualDate){
          return t;
        }
      })
      res.send(turns);
    } catch(error){
      next(error)
    }
  }

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
