/*
 * Name: app.js
 * Description: App configuration file.
 * Author: Cacaudev
 * Date: 27/09/2019
*/

"use strict";

import Koa from "koa";
import morgan from "koa-morgan";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import compress from "koa-compress";

import {
  requestParser,
  errorHandler
} from "./global/middlewares";

import baseRouter from "./routes";
import logger from "./global/utils/logger";

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
    this.silent = this.env !== "development";
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
    this.use(morgan("tiny", { stream: logger.stream }));
    /**
    * Compress middleware for Koa
    */
    this.use(compress());
    /**
     * Error middleware
     */
    this.use(errorHandler);
    /**
     * Parse request payload
     */
    this.use(requestParser({
      enableTypes: ["json"],
      jsonLimit: "5mb"
    }));
    /**
     * Load API routes
     */
    this.use(
      baseRouter.routes(),
      baseRouter.allowedMethods()
    );

    console.log("routes: ");
    console.log(baseRouter.stack.map(i => i.path));
  }
}

export default App;
