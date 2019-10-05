'use strict';
 var config = require('./development.json');
import './production.js';
const env = process.env.NODE_ENV || 'development'
;

export var config = config;