'use strict';

const swaggerJsdoc = require('swagger-jsdoc');
const appInfo = require('../../package.json');

const info = {
  title: appInfo.name,
  description: appInfo.description,
  version: appInfo.version,
  contact: appInfo.author,
  termsOfService: ''
};
const servers = [];

// Swagger definitions
const definition = {
  openapi: '3.0.0',
  info,
  servers
};

// Options for the swagger specification
const options = {
  definition,
  // Path to the API specs
  apis: [
    __dirname + '/../src/controllers/*.js',
  ]
};
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
