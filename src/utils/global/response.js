/*
 * Description: Response object.
 * Author: Cacaudev
 * Date: 08/11/2019
*/
'use strict';

import STATUS_CODES from '../../static/status_codes';
import { format_response } from './response.formatter';

class Response {
  static get STATUS_CODES() {
    return STATUS_CODES;
  }

  /**
   * Return Response with code 200.
   * @param {*} ctx
   * @param {*} content
   * @example
   * return Response.success(ctx, { user: user_data });
   */
  static success(ctx, content) {
    format_response(ctx, this.STATUS_CODES.OK, content);
  }

  /**
   * Return Response with code 201.
   * @param {*} ctx
   * @param {*} content
   * @example
   * return Response.success(ctx, { user: user_data });
   */
  static created(ctx, content) {
    format_response(ctx, this.STATUS_CODES.CREATED, content);
  }

  /**
   *
   * @param {*} ctx
   * @param {*} content
   * @returns
   *
   * @example
   * return Response.error(ctx, 'NOT_FOUND', 'User not found');
   */
  static error(ctx, event, content) {
    let status = this.STATUS_CODES[event] || ctx.status;
    if (status == 500)
      status = this.STATUS_CODES.INTERNAL_SERVER_ERROR;

    format_response(ctx, this.STATUS_CODES[event], content);
  }
}

module.exports = Response;
