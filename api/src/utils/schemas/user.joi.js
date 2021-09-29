const Joi = require("@hapi/joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string(),
  surname: Joi.string(),
  admin: Joi.boolean(),
});

module.exports = schema;
