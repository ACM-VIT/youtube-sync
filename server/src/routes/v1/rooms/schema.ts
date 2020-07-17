import Joi from "@hapi/joi";

export default {
  room: Joi.object().keys({
    name: Joi.string().required().min(1),
    pwd: Joi.string().required().min(1),
  }),
  remove: Joi.object().keys({
    name: Joi.string().required().min(1),
  }),
};
