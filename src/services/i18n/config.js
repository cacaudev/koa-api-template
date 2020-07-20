/*
 * Name: locale.js
 * Description: i18next init and config file.
 * Author: Cacaudev
 * Date: 01/11/2019
 */
'use strict';

const i18next = require('i18next');
const resources = require('./locales');

var options = {
  // language codes to lookup
  load: 'current',
  // Set to true to see debug messages
  debug: false,
  // language to use if translations in user language are not available
  fallbackLng: {
    'pt-BR': ['pt'],
    'en-US': ['en'],
    default: ['en'],
  },
  resources: resources.langs,
  // string or array of namespaces to load
  ns: resources.lngNamespaces,
  defaultNS: 'info',
  preload: resources.languages,
};

i18next.init(options);
export default i18next;
