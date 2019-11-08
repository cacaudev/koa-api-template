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
import {
  Body_Parser,
  Error_Handler
} from './middlewares';
import app_router from './routes';
import Logger from './loaders/logger';

class App extends Koa {
  /**
   * @summary Create an Koa App instance.
   * @class
   * @property {boolean} proxy - Proxy header fields will be trusted
   * @property {string} silent - Disable `console.errors` except in development env
   * @returns {App} App instance
   *
   * @example
   * const app = new App();
   */
  constructor(...params) {
    super(...params);
    this.proxy = true;
    this.silent = this.env !== 'development';
    this.setMiddlewares();
  }

  /**
   * @desc Middlewares that will be executed before the controllers.
   * The call order is important.
   * @method
   */
  setMiddlewares() {
    /**
     * Enable Cross Origin Resource Sharing to all origins by default
     */
    this.use(cors());
    /**
     * Basic node security
     */
    this.use(helmet());
    /**
     * Main app logger
     */
    this.use(morgan('tiny', { stream: Logger.stream }));
    /**
     *
     */
    this.use(Error_Handler);
    /**
     * Parse request payload
     */
    this.use(Body_Parser({
      enableTypes: ['json'],
      jsonLimit: '5mb'
    }));
    /**
     * Load API routes
     */
    this.use(
      app_router.routes(),
      app_router.allowedMethods()
    );
  }
}

export default App;
