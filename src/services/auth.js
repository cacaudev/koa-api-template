'use strict';

import User from '../../db/models';

//import { User } from '../../db/models';
/**
 * @class
 */
export default class AuthService {

  /**
   * @param {Object} user_input - User credentials
   */
  async Signup(user_input) {
    const UserRecord = await User.create(user_input);
    console.log('TCL: AuthService -> Signup -> UserRecord', UserRecord);

    return true;
  }
}
