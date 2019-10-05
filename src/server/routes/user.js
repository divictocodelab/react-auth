var express = require('express');
var router = express.Router();
import  controllers from '../controllers';

import validators from '../validators';
let validator = validators.userValidator;

let { authController, userController } = controllers;
router.post('/user/add', userController.addNum);
router.get('/user',authController.checkAuthenticated, userController.findAll);
router.get('/user/:id', authController.checkAuthenticated, userController.findOne);
router.post('/user',  validator.validateUserCreate, authController.checkAuthenticated, userController.save);
router.put('/user/:id', validator.validateUserUpdate, authController.checkAuthenticated, userController.updateUser);
router.delete('/user/:id', authController.checkAuthenticated, userController.deleteUser);
module.exports = router;
