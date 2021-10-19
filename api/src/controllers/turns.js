const { Turn, User } = require("../db.js");
const Modelo = require("./index.js");

var id = 0;
class TurnModel extends Modelo {
  constructor(model) {
    super(model);
  }
  getAll = async (req, res, next) => {
    try {
      const turns = await this.model.findAll({ include: User });
      return res.send(turns.dataValues);
    } catch (error) {
      next(error);
    }
  };
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
  getByStore = async (req, res, next) => {
    try {
      const { store } = req.body;

      const turns = await this.model.findAll({
        where: { store },
      });
      return res.send(turns);
    } catch (err) {
      next(err);
    }
  };
  assignTurn = async (req, res, next) => {
    const { username, store, date, hour } = req.body;
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });
      const turn = await this.model.findOne({
        where: {
          store,
          date,
          hour,
        },
      });
      user.setTurn(turn.dataValues.id);
      await turn.increment({
        full: +1,
      });
      turn.save();
      return res.send("Turno asignado");
    } catch (error) {
      next(error);
    }
  };
  cancelTurn = async (req, res, next) => {
    const { username, store, date, hour } = req.body;
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });
      const turn = await this.model.findOne({
        where: {
          store,
          date,
          hour,
        },
      });
      await user.update({
        turnId: null,
      });
      await turn.increment({
        full: -1,
      });
      turn.save();
      return res.send("Turno cancelado");
    } catch (error) {
      next(error);
    }
  };
}

const turnControllers = new TurnModel(Turn);

module.exports = turnControllers;
