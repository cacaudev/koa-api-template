"use strict";

import os from "os";
import { LocaleService } from "../../i18n/locale.service";
import swaggerSpec from "../../config/swagger";
import appInfo from "../../../package.json";
import Response from "../../utils/response";

class MainController {
  async getApiInfo(ctx) {
    const { locale } = ctx.request.query;
    let i18n = new LocaleService(locale);
    const response = new response(ctx);

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

    return response.success({
      message: i18n._t("info:welcome"),
      info: data
    });
  }

  async status(ctx) {
    const response = new response(ctx);
    return response.success({
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
    return new Response(ctx).success(swaggerSpec);
  }
}

module.exports = { MainController };
