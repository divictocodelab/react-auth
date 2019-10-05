'use strict';
import bcrypt from 'bcrypt';
import model from '../model';
const jwt = require('jsonwebtoken');
let User = model.user;

let authController = {
  /**
   * Login user
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async login(req, res, next) {
    let bodyData = req.body;
    const password = bcrypt.hashSync(bodyData.password, 10);
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      if (bcrypt.compareSync(bodyData.password, user.password)) {
        // Passwords match
        jwt.sign({ user }, 'SuperSecRetKey', { expiresIn: 60 * 60 }, (err, token) => {
          res.status(200).json({token: token });
        });
      } else {
        // Passwords don't match
        res.json({ data: null, status: 400, message: 'Passwords does not match' });
      }
    } else {
      res.json({ data: null, status: 400, message: 'Passwords does not match' });
    }
  },

  /**
   * Sign up  user
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async signUp(req, res, next) {

    let bodyData = req.body;
    console.log(bodyData);
    const password = bcrypt.hashSync(bodyData.password, 10);
    let userData = {
      name: bodyData.name,
      email: bodyData.email,
      password: password
    };
     let user = await User.create(userData);
    // res.json({
    //   status: true,
    //   data: null,
    //   message: "You have registered successfully."
    // });
    jwt.sign({ user }, 'SuperSecRetKey', { expiresIn: 60 * 60 * 60 }, (err, token) => {
     // res.json({ token });
      res.status(200).json({
        status: true,
        data: { token: token },
        message: "You have registered successfully."
      });
    });
  },


  async jwtlogin(req, res, next) {
    //Request header with authorization key
    jwt.verify(req.token, 'SuperSecRetKey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          authData
        });
      }
    });
  },
  /**
  * Check admin authentication
  *
  * @param {object} req
  * @param {object} res
  * @param {function} next
  *
  */
  async checkAuthenticated(req, res, next) {
    try {
      let token = getToken(req);
      if (token) {
        let decodedToken = decodeToken(token);
        let response = {};
        let currentDate = new Date();
        let userToken = await User.findOne({ where: { email: decodedToken.user.email } });

        if (!userToken) {
          let error = new Error("Invalid access token");
          error.status = 401;
          next(error);
        } else {
          let user = userToken.get().user;
          req.user = user;
          return next(null, user, { scope: "all" });
        }
      } else {
        let error = new Error("User is not authenticated.");
        error.status = 401;
        next(error);
      }
    } catch (error) {
      next(error);
    }
  },
}

let decodeToken = token => {
  const decoded = jwt.decode(token);
  return decoded;
}

let getToken = req => {
  let token;
  if (req.headers && (req.headers.authorization || req.headers["authorization"])) {
    token = req.headers.authorization ? req.headers.authorization : req.headers["authorization"];
  }

  if (req.body && req.body.authorization) {
    token = req.body.authorization;
  }

  if (req.query && req.query.authorization) {
    token = req.query.authorization;
  }

  if (req.query && req.params.authorization) {
    token = req.params.authorization;
  }
  if (token) {
    const bearer = token.split(' ');
    token = bearer[1];
    return token;

  }
};

export default authController;