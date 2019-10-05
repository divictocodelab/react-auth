'use strict';
import express from 'express';
import Bootstrap from './bootstrap';

let app = express();
var port = process.env.PORT || '5003';
app.set('port', port);
var bootstrap = new Bootstrap(app);