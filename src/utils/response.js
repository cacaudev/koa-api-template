/*
 * Description: Response object.
 * Author: Cacaudev
 * Date: 08/11/2019
*/
"use strict";
import STATUS_CODES from "../static/statusCodes";

class Response {
  /**
   * @class
   * @param {KoaContext} ctx Request and Response objects from HTTP Layer
   */
  constructor(ctx) {
    this.ctx = ctx;
  }
  static get STATUS_CODES() {
    return STATUS_CODES;
  }
  /**
   * @function
   * @param {Number} status
   * @param {Object} content
   */
  static respond(status, content = null) {
    this.ctx.status = status;
    this.ctx.type = "application/json";
    this.ctx.body = content;
    return;
  }
  /**
   * Return Response with code 200.
   * @param {*} ctx
   * @param {*} content
   * @example
   * return Response.success(ctx, { user: userData });
   */
  static success(content) {
    this.respond(this.STATUS_CODES.OK, content);
  }
  /**
   * @function
   * Return Response with code 201.
   * @param {object, string} content
   */
  static created(content) {
    this.respond(this.STATUS_CODES.CREATED, content);
  }
  /**
   * @function
   * Return Response with code 204.
   */
  static noContent() {
    this.respond(this.STATUS_CODES.NO_CONTENT);
  }
  /**
   * @function
   * Return Response with code 404.
   * @param {string} resourceName
   */
  static notFound(resourceName) {
    this.respond(this.STATUS_CODES.NOT_FOUND, {
      error: {
        name: "NOT_FOUND",
        resource: resourceName,
        message: "Selected resource was not found"
      }
    });
  }
  /**
  * @function
  * Return Response with code 401.
  */
  static unauthorized() {
    this.respond(this.STATUS_CODES.UNAUTHORIZED, {
      error: {
        name: "UNAUTHORIZED",
        message: "Route requires authorization"
      }
    });
  }
  /**
   * @function
   * Return Response with code 405.
   */
  static methodNotAllowed() {
    this.respond(this.STATUS_CODES.METHOD_NOT_ALLOWED, {
      error: {
        name: "METHOD_NOT_ALLOWED",
        message: "REST Method not allowed"
      }
    });
  }
  /**
   * @function
   * @param {object, string} content
   * @example
   * Response.error("BAD_REQUEST", "User params are invalid");
   */
  static error(event, content = {}) {
    let status = this.STATUS_CODES[event] || this.ctx.status;
    if (status == 500)
      status = this.STATUS_CODES.INTERNAL_SERVER_ERROR;
    this.respond(this.STATUS_CODES[event], content);
  }
}

module.exports = Response;
