/*
 * Name: main.router.js
 * Description: Router for main resource endpoints.
 * author: Cacaudev
 * Date: 06/11/2019
*/

'use strict';

import { MainController } from '../controllers';
/**
 * @param {Router} Router - Koa Router instance
 * @param {Router} app_router - app router from app
 */
export default (Router, app_router) => {
  const main_router = new Router;

  const mainController = new MainController();

  main_router.get('/', mainController.getApiInfo);
  main_router.get('/spec', mainController.spec);
  main_router.get('/status', mainController.status);

  app_router.use(main_router.routes());
};
