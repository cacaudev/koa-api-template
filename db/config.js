
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname + '../../config/.env')
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
  }
};
