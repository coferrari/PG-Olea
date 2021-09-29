let id = 0;

class Modelo {
  constructor(model) {
    this.model = model;
  }
  getAll = (req, res, next) => {
    const Users = this.model.findAll();
    Users.then((results) => {
      res.send(results);
    }).catch((error) => next(error));
  };

  getByID = (req, res, next) => {
    const { id } = req.params;
    this.model
      .findByPk(id)
      .then((result) => res.send(result))
      .catch((error) => next(error));
  };

  create = (req, res, next) => {
    const body = req.body;
    this.model
      .create({ ...body, id: id })
      .then((createElement) => res.send(createElement))
      .catch((error) => next(error));
  };

  update = (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    this.model
      .update(body, {
        where: {
          id,
        },
      })
      .then((update) => {
        res.send(update);
      })
      .catch((error) => next(error));
  };

  delete = (req, res, next) => {
    const { id } = req.params;
    this.model
      .destroy({
        where: {
          id,
        },
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => next(error));
  };
}

module.exports = Modelo;
