"use strict";

import os from "os";
import { LocaleService } from "../../i18n/locale.service";
import swaggerSpec from "../../../config/swagger";
import appInfo from "../../../package.json";
import Response from "../../utils/response";

class MainController {
  async getApiInfo(ctx) {
    const { locale } = ctx.request.query;
    let i18n = new LocaleService(locale);

    const environments = {
      nodeVersion: appInfo.engines.node,
      npmVersion: appInfo.engines.npm,
      hostname: os.hostname(),
      platform: `${process.platform}/${process.arch}`
    };
    const data = {
      name: appInfo.name,
      version: appInfo.version,
      description: appInfo.description,
      environments
    };

    return Response.success(ctx, {
      message: i18n._t("info:welcome"),
      info: data
    });
  }

  async status(ctx) {
    return Response.success(ctx, {
      services: [{
        name: "auth",
        status: "ok"
      }, {
        name: "dashboard",
        status: "ok"
      }]
    });
  }

  async spec(ctx) {
    return Response.success(ctx, swaggerSpec);
  }
}

module.exports = { MainController };
