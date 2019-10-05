var express = require('express');
var ExpressJoi = require('express-joi-validator');
var router = express.Router();
import controller from '../controllers';
const Joi = require('@hapi/joi');
import validators from '../validators';
let validator = validators.authValidator;
// const validator = createValidator()
// const validator = validate.createValidator({
//     // You can pass a specific Joi instance using this option. By default the
//     // module will load the @hapi/joi version you have in your package.json
//     // joi: require('@hapi/joi')
//   })
//const validator = createValidator;

let auth = controller.authController;
var querySchema = {
    body: {
        email: Joi.required()
    }
};
const contactSchema = {
    params: {
        email: Joi.required()
    }
};

const schema = Joi.object().keys({
    email: Joi.required()
});

const schemae = Joi.validate({}, schema, (error, values) => {
    
});

const schema2 = Joi.object({
    email: Joi.required()
}).required()
//console.log(Joi.validate(undefined, schema2))

// exports.validateUser = (user) => {
//     const schema = Joi.object().keys({
//     firstName: joi.string().min(3).max(40).required(),
//     lastName: joi.string().min(3).max(40).required(),
//     email: joi.string().email({ minDomainAtoms: 2 }).required(),
//     isAdmin: joi.boolean(),
//     password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
//     });
//     return joi.validate(user, schema, {abortEarly: false});
//     };
var bodySchema2 = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().required()
    }
};

router.post('/signup', validator.validateUser, auth.signUp);
// router.post('/signup', ExpressJoi(bodySchema2),  auth.signUp);
router.post('/login', validator.validateUserLogin, auth.login);
module.exports = router;
