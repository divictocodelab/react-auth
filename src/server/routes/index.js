'use strict';
var express = require('express');
var router = express.Router();
var auth = require('./auth');
var user = require('./user');

let register = app => {
  router.use('/api', [auth, user]);
  app.use(router);

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      success: false,
      data: null,
      error: error,
      message: error.message
    });
  });

  app.use(function (err, req, res, next) {
      if (err.isBoom) {
          return res.status(err.output.statusCode).json(err.output.payload);
      }
  });

  app.use((req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    res.status(error.status).json({
      success: false,
      data: null,
      error: error,
      message: error.message
    });
  });
  
};
export default register;
