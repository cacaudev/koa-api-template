"use static";
import Response from "../utils/response";

export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    switch (error.name) {
      case "TypeError":
        Response.error(ctx, "BAD_REQUEST", {
          error: {
            name: error.name,
            message: error.message
          }
        });
        break;
      case "ValidationError":
        Response.error(ctx,
          "BAD_REQUEST",
          {
            error: {
              name: error.name,
              field: error.details[0].path,
              response: error.details[0].message.replace(/"/g, "")
            }
          }
        );
        break;
      case "InvalidValue":
        Response.error(ctx,
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
        Response.error(ctx,
          "NOT_FOUND",
          "Selected resource was not found"
        );
        break;
      default:
        console.log(error);
        Response.error(ctx,
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
