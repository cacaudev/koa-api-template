/*
 * Name: main.router.js
 * Description: Router for main resource endpoints.
 * author: Cacaudev
 * Date: 06/11/2019
*/
'use strict';

import Router from 'koa-router';
import { MainController } from './main.controller';

const MainRouter = new Router;
const mainController = new MainController();

MainRouter
  .get('/', mainController.getApiInfo)
  .get('/spec', mainController.spec)
  .get('/status', mainController.status);

export default MainRouter;
