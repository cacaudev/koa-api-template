/*
  Author: cacaudev
  Date: 14/11/2019
  Description: Parse Basic Authorization Header
  and extract user credentials.
*/

import config from '../../../config';
import bcrypt from 'bcryptjs';

export async function encryptPassword(password) {
  let new_password;
  try {
    new_password = bcrypt.hashSync(
      password,
      Number(config.auth.bycrypt_cost)
    );
  } catch (error) {
    return { error: error };
  }
  return new_password;
}