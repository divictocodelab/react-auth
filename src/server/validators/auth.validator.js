const Joi = require('@hapi/joi');
export const contactSchema = {
    params: {
      name: Joi.string().required()
    }
  };
   
  export const bodySchema2 = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().required()
    }
};