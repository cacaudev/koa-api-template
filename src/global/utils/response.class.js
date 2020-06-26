/*
 * Description: Response object.
 * Author: Cacaudev
 * Date: 08/11/2019
*/
"use strict";

import STATUS_CODES from "../../static/status_codes";
import { Responder } from "../middlewares/responder";

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
    Responder(ctx, this.STATUS_CODES.OK, content);
  }

  /**
   * Return Response with code 201.
   * @param {*} ctx
   * @param {object, string} content
   * @example
   * Response.success(ctx, { user: user_data });
   */
  static created(ctx, content) {
    Responder(ctx, this.STATUS_CODES.CREATED, content);
  }

  /**
   * Return Response with code 204.
   * @param {*} ctx
   * @example
   * Response.noContent(ctx);
   */
  static noContent(ctx) {
    Responder(ctx, this.STATUS_CODES.NO_CONTENT);
  }

  /**
   * Return Response with code 404.
   * @param {*} ctx
   * @example
   * Response.notFound(ctx, "User");
   */
  static notFound(ctx, resource_name) {
    Responder(ctx, this.STATUS_CODES.NOT_FOUND, {
      error: {
        name: "NOT_FOUND",
        resource: resource_name,
        message: "Selected resource was not found"
      }
    });
  }

  static unauthorized(ctx) {
    Responder(ctx, this.STATUS_CODES.UNAUTHORIZED, {
      error: {
        name: "UNAUTHORIZED",
        message: "Route requires authorization"
      }
    });
  }

  /**
   *
   * @param {*} ctx
   * @param {object, string} content
   * @returns
   *
   * @example
   * Response.error(ctx, "BAD_REQUEST", "User params are invalid");
   */
  static error(ctx, event, content) {
    let status = this.STATUS_CODES[event] || ctx.status;
    if (status == 500)
      status = this.STATUS_CODES.INTERNAL_SERVER_ERROR;

    Responder(ctx, this.STATUS_CODES[event], content);
  }
}

module.exports = Response;
