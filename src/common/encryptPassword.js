/*
  Author: cacaudev
  Date: 14/11/2019
  Description: Parse Basic Authorization Header
  and extract user credentials.
*/

import config from '@config/index';
import bcrypt from 'bcryptjs';

const encryptPassword = async (password) => {
  return bcrypt.hashSync(password, Number(config.auth.bcrypt_cost));
};

export { encryptPassword };
