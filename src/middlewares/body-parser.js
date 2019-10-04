'use strict';

import bodyParser from 'koa-bodyparser';

/**
 * Return middleware that parses HTTP request body.
 * @module body_parser
 * @param {Object} [options={enableTypes: Array of strings, jsonLimit: String}]
 * @return {function} Body parser function.
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
