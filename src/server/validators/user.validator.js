const Joi = require('@hapi/joi');
export const contactSchema = {
    params: {
      id: Joi.number().required()
    }
  };
   