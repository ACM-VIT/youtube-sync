import Joi from "@hapi/joi";

export default {
  login: Joi.object().keys({
    name: Joi.string().required().min(1),
  }),
};
