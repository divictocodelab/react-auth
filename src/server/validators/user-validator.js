import utils from '../utils';

let validator = utils.validator;


/**
 * Validate create user request
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
function validateUserCreate(req, res, next) {
    let bodyData = req.body;
    let errors = [];
    let rules = {
        name: [
            { type: 'required', message: 'Name is required.' },
            { type: 'length', options: { min: 2, max: 50 }, message: 'Name length must be between 2 to 50.' }
        ],
        email: [
            { type: 'required', message: 'Email is required.' },
            { type: 'email', message: 'Email should be valid format.' }
        ],
        phone_number: [
            { type: "required", message: "Phone number is required." },
            {
                type: "length",
                options: { min: 0, max: 15 },
                message: "Phone Number length must not be greater than 15."
            }
        ],
    };

    errors = validator.validateModel(bodyData, rules);

    if (errors.length) {
        res.status(400).json({ success: false, data: null, error: errors, message: 'Invalid request' });
    } else {
        next();
    }
}

/**
 * Validate create user request
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
function validateUserUpdate(req, res, next) {
    let bodyData = req.body;
    let errors = [];
    let rules = {
        name: [
            { type: 'required', message: 'Name is required.' },
            { type: 'length', options: { min: 2, max: 50 }, message: 'First name length must be between 2 to 50.' }
        ],
       
        email: [
            { type: 'required', message: 'Email is required.' },
            { type: 'email', message: 'Email should be valid format.' }
        ],
     
        phone_number: [
            { type: "required", message: "Phone number is required." },
            {
                type: "length",
                options: { min: 0, max: 15 },
                message: "Phone Number length must not be greater than 15."
            }
        ],
    };
    errors = validator.validateModel(bodyData, rules);
    if (errors.length) {
        res.status(400).json({ success: false, data: null, error: errors, message: 'Invalid request' });
    } else {
        next();
    }
}

export { validateUserCreate, validateUserUpdate};