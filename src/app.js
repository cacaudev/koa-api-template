/*
 * Name: app.js
 * Description: App configuration file.
 * Author: Cacaudev
 * Date: 27/09/2019
 */
'use strict';

import Koa from 'koa';
import morgan from 'koa-morgan';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';

import { requestParser, errorHandler } from './loaders';
import baseRouter from '@routers/baseRouter';
import logger from './loaders/logger';

class App extends Koa {
  constructor(...params) {
    super(...params);
    this.proxy = true;
    this.silent = this.env !== 'development';
    this.applyMiddlewares();
  }
  applyMiddlewares() {
    /**
     * Enable Cross Origin Resource Sharing to all origins by default
     */
    this.use(cors());
    /**
     * Basic nodejs security
     */
    this.use(helmet());
    /**
     * Main app logger
     */
    this.use(morgan('tiny', { stream: logger.stream }));
    /**
     * Compress middleware for Koa
     */
    this.use(compress());
    this.use(errorHandler);
    this.use(
      requestParser({
        enableTypes: ['json'],
        jsonLimit: '5mb',
      })
    );
    this.use(baseRouter.routes(), baseRouter.allowedMethods());
  }
}

export default App;
