import express, { Application } from 'express';
import path from 'path';
import http from 'http';
import os from 'os';
import correlator from 'express-correlation-id';
import installValidator from './openapi';
import { pinoLogger } from './logger';
import errorHandler from '../api/middlewares/error.handler';
import notFound from './notfound';
import loggingRequestHandler from '../api/middlewares/logging.request.handler';
import mongoose from "mongoose";

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(express.static(`${root}/public`));
    app.use(express.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      express.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      }),
    );
    app.use(correlator());
    app.use(loggingRequestHandler);
    app.disable('x-powered-by');
  }

  router = (routes: (app: Application) => void): ExpressServer => {
    installValidator(app, routes);
    return this;
  };

  configurationAfterRouter = (): ExpressServer => {
    app.use(errorHandler);
    app.use(notFound);
    return this;
  }

  connectToDatabase = (): ExpressServer => {
    const mongodbURI = process.env.MONGO_URI;
    pinoLogger.info('Connecting to mongodb...');
    mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true }).
    then((res) => {
        pinoLogger.info('Connected to mongodb successfully!')
      }
    );
    return this;
  }

  listen = (p: string | number): Application => {
    const welcome = (port) => (): void => pinoLogger.info(
      `up and running in ${process.env.NODE_ENV
          || 'development'} @: ${os.hostname()} on port: ${port}}`,
    );

    http.createServer(app).listen(p, welcome(p));
    return app;
  };
}
