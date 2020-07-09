"use static";
import Response from "../utils/response";

export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    console.log('error handler', error);
    const response = new Response(ctx);
    switch (error.name) {
      case "SequelizeUniqueConstraintError":
        response.error("UNPROCESSABLE_ENTITY", {
          error: {
            name: error.name,
            field: error.errors[0].path,
            message: error.errors[0].message
          }
        });
        break;
      case "SequelizeDatabaseError":
        response.error("BAD_REQUEST", {
          error: {
            name: error.name,
            message: error.message
          }
        });
        break;
      case "TypeError":
        console.log('error on type error', error);
        response.error("BAD_REQUEST", {
          error: {
            name: error.name,
            message: error.message
          }
        });
        break;
      case "ValidationError":
        response.error(
          "BAD_REQUEST",
          {
            name: error.name,
            field: error.details[0].path,
            response: error.details[0].message.replace(/"/g, "")
          }
        );
        break;
      case "InvalidValue":
        response.error(
          "BAD_REQUEST",
          {
            error: {
              name: error.name,
              field: error.field,
              response: error.message
            }
          }
        );
        break;
      case "NotFound":
        response.notFound(error.name);
        break;
      case "methodNotAllowed":
        response.error(
          "METHOD_NOT_ALLOWED",
          "Route does not exist."
        );
        break;
      default:
        console.log('error on error handler default', error);
        response.error(
          "INTERNAL_SERVER_ERROR",
          {
            error: {
              name: error.name,
              field: error.field,
              response: error.message
            }
          }
        );
    }
  }

  return;
}
