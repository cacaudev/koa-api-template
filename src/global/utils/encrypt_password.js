/*
  Author: cacaudev
  Date: 14/11/2019
  Description: Parse Basic Authorization Header
  and extract user credentials.
*/

import config from "../../../config";
import bcrypt from "bcryptjs";

const encryptPassword = async (password) => {
  let new_password;
  try {
    new_password = bcrypt.hashSync(
      password,
      Number(config.auth.bcrypt_cost)
    );
  } catch (error) {
    return { error: error };
  }
  return new_password;
};

export { encryptPassword };
