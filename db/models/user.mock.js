"use strict";

var mock_users = require("../mock_examples/users.json");

module.exports = (sequelizeMock) => {
  let User = sequelizeMock.define("User");
  User.$queueResult([
    User.build(mock_users[0]),
    User.build(mock_users[1])
  ]);
  return User;
};
