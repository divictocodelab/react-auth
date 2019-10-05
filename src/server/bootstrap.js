'use strict';
var bodyParser = require('body-parser');
var compression = require('compression');
var cors = require('cors');
import models from './model';
import routes from './routes';
import controller from './controllers';
import methodOverride from "method-override";
import express from "express";
const cluster = require('cluster');
const os = require('os');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
var swaggerDefinition = {
    swagger: "2.0",
    info: {
        "title": "Blah",
        "description": "",
        "version": "3.0.0"
    },
    produces: ["application/json"],
};
// const swaggerDocument2 = YAML.load('../swagger/*.yaml');
var options = {
    // import swaggerDefinitions
    // swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['../swagger/*.yaml'],
};
const swaggerDocument2 = '../swagger/*.yaml';
var options2 = {
    explorer: true
};

// const helmet = require('helmet')
export default class Bootstrap {

    constructor(app) {
        this.app = app;
        this.middleware(this.app);
        this.start(this.app);
        this.routes(this.app);
        this.createDb();
    }

    middleware(app) {
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(compression());
        app.use(methodOverride());
        //  var swaggerSpec = swaggerJSDoc(options);
        //  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup( options));
        app.use("/swagger", express.static(__dirname + "/swagger"));
        // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup( options));
         app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options2));
       // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument2, options2));
        // app.use(helmet());
    }

    routes(app) {
        routes(app);
    }

    createDb() {
        models.sequelize.sync().then(function () {
            // console.log('Nice! Database looks fine')
        }).catch(function (err) {
            console.log(err, "Something went wrong with the Database Update!")
        });
    }

    start(app) {
        const numCPUs = os.cpus().length;
        if (cluster.isMaster) {
            console.log(`numCPUs ${numCPUs}`);
            console.log(`Master ${process.pid} is running`);
            // Fork workers.
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
            });
        } else {
            const port = app.get('port');
            app.listen(port, function (err) {
                if (!err) { //console.log("Site is live : " + port);
                } else console.log(err)

            });
        }
    }
};