const Joi = require("joi");

function validateRegister(userdata) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(userdata);
}

function validateLogin(userdata) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(userdata);
}

module.exports = { validateRegister, validateLogin };
