'use strict';

import bodyParser from 'koa-bodyparser';

/**
 * Return middleware that parses HTTP request body.
 * @module body_parser
 * @param {Object} options
 * @param {Array} options.enableTypes - Ex: Json, UrlEncoded...
 * @param {string} options.jsonLimit - Limit in Mb for json payload
 * @return {function} Convert request body to JSON type
 * @throws {InvalidMediaType} When the request format is invalid.
 */
export function body_parser(options = {}) {
  return bodyParser({
    ...options,
    onerror: () => {
      console.log('Error: Invalid format is detected in the request body');
    }
  });
}
