/*
 * Name: app.js
 * Description: App configuration file.
 * Author: Cacaudev
 * Date: 27/09/2019
*/

'use strict';

import Koa from 'koa';
import morgan from 'koa-morgan';
import { body_parser } from './middlewares';
import Logger from './loaders/logger';

/**
 * Class representing an Koa App.
 * @extends Koa
 */
class App extends Koa {
  /**
   * Create an App.
   * Enable proxy, silent logging for
   * production env and set middlewares.
   * @constructor
   */
  constructor(...params) {
    super(...params);
    // Trust proxy
    this.proxy = true;
    // Disable `console.errors` except development env
    this.silent = this.env !== 'development';
    this.setMiddlewares();
  }

  /**
   * Set middlewares for the
   * app instance.
   */
  setMiddlewares() {
    this.use(
      body_parser({
        enableTypes: ['json'],
        jsonLimit: '5mb'
      })
    );
    this.use(morgan('tiny', { stream: Logger.stream }));
    this.use(async ctx => {
      ctx.type = 'application/json';
      ctx.body = {
        status: 'success',
        response: 'Welcome to koa api template!'
      };
    });
  }
}

export default App;
