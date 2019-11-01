/*
 * Name: db.js
 * Description: Database configuration file.
 * Author: Cacaudev
 * Date: 28/10/2019
*/


const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname + '/.env')
});

module.exports = {
  'development': {
    'url': process.env.DEVELOPMENT_DATABASE_URL,
    'logging': false,
    'operatorsAliases': false,
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': false
    }
  },
  'test': {
    'url': process.env.TEST_DATABASE_URL,
    'logging': false,
    'operatorsAliases': false,
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': true
    }
  },
  'stage': {
    'url': process.env.STAGE_DATABASE_URL,
    'logging': false,
    'operatorsAliases': false,
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': true
    }
  },
  'production': {
    'url': process.env.PRODUCTION_DATABASE_URL,
    'logging': false,
    'operatorsAliases': false,
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': true
    }
  }
};
