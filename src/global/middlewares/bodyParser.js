/*
 * Description: Format request response.
 * Author: Cacaudev
 * Date: 01/11/2019
*/
"use strict";

import bodyParser from "koa-bodyparser";
import Logger from "../../loaders/logger";
/**
 * Return middleware that parses HTTP request body.
 * @module body_parser
 * @param {Object} options
 * @param {Array} options.enableTypes - Ex: Json, UrlEncoded...
 * @param {string} options.jsonLimit - Limit in Mb for json payload
 * @return {function} Convert request body to JSON type
 * @throws {InvalidMediaType} When the request format is invalid.
 */
const BodyParser = (options = {}) => {
  return bodyParser({
    ...options,
    onerror: () => {
      Logger.error("Error: Invalid format is detected in the request body");
    }
  });
};

export { BodyParser };
