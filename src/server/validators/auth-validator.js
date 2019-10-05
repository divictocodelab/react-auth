import utils from '../utils';

let validator = utils.validator;

/**
 * Validate create user request
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function validateUser(req, res, next) {
  let bodyData = req.body;
  let errors = [];
  let rules = {
    name: [
      { type: 'required', message: 'Name is required.' },
      {
        type: 'length',
        options: { min: 1, max: 250 },
        message: 'Name length must be between 1 to 250.'
      }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email should be valid format.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'length',
        options: { min: 1, max: 250 },
        message: 'Password length must be between 1 to 250.'
      }
    ]
  };
  errors = validator.validateModel(bodyData, rules);
  if (errors.length) {
    res.status(400).json({
      success: false,
      data: null,
      error: errors,
      message: 'Invalid request'
    });
  } else {
    next();
  }
}

function validateUserLogin(req, res, next) {
  let bodyData = req.body;
  let errors = [];
  let rules = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email should be valid format.' }
    ],
    password: [{ type: 'required', message: 'Password is required.' }],

  };
  errors = validator.validateModel(bodyData, rules);
  if (errors.length) {
    res.status(400).json({
      success: false,
      data: null,
      error: errors,
      message: 'Invalid email or password'
    });
  } else {
    req.body.user_type = 'customer';
    next();
  }
}

export {
  validateUser,
  validateUserLogin,
};
