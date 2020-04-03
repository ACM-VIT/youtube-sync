const Joi = require("@hapi/joi");

const loginValidation = async (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(1),
    noOfSyncs: Joi.number()
      .required()
      .min(0),
    createdAt: Joi.string().required()
  });
  try {
    const obj = await schema.validateAsync(data);
    return undefined;
  } catch (err) {
    return err;
  }
};

const roomValidation = async (data) => {
  const schema = Joi.object({
    room: Joi.string()
      .required()
      .min(1),
    pwd: Joi.string()
      .required()
      .min(1)
  });
  try {
    const obj = await schema.validateAsync(data);
    return undefined;
  } catch (err) {
    return err;
  }
};

module.exports = {
  loginValidation,
  roomValidation
};
