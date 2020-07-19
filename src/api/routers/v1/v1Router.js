/*
 * @Author: cacaudev
 * @Date: 2020-06-30 21:00:00
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-19 18:37:42
 */

'use strict';
import Router from 'koa-router';
import authRouter from './authRouter';
import userRouter from './userRouter';
import config from '../../../config';

const v1Router = new Router({
  prefix: config.api.prefix,
});

v1Router.use(authRouter.routes()).use(userRouter.routes());

export default v1Router;
