'use strict';

import bodyParser from 'koa-bodyparser';

/**
 * Return middleware that parses HTTP request body.
 * @param {Object} [options={}]
 * @return {function} Koa middleware.
 */

export function body_parser(options = {}) {
  return bodyParser({
    ...options,
    onerror: () => {
      console.log('Error: Invalid format is detected in the request body');
    }
  });
}
