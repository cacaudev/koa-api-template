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

class App extends Koa {
  /**
   * @summary Create an Koa App instance.
   * @class
   *
   * @returns {App} App instance
   *
   * @example
   * const app = new App();
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
   * @summary setMiddlewares
   * @method
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
