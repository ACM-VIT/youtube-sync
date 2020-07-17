import Joi from "@hapi/joi";

export default {
  room: Joi.object().keys({
    name: Joi.string().required().min(1),
    password: Joi.string().required().min(1),
  }),
};
