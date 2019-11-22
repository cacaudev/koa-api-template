/*
 * Name: jest.config.js
 * Description: Jest configuration for running tests.
 * Author: cacaudev
 * Date: 22/11/2019
*/

module.exports = {

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: null,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: null,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // A map from regular expressions to module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
};
