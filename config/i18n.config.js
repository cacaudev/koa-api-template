/*
 * Name: locale.js
 * Description: i18next init and config file.
 * Author: Cacaudev
 * Date: 01/11/2019
*/


'use strict';

const i18next = require('i18next');

// Translations folder
const resources = require('../src/locales');

i18next
  .init({
    // language codes to lookup
    load: 'current',
    // language to use if translations in user language are not available
    fallbackLng: 'en',
    resources,
    // string or array of namespaces to load
    ns: ['info'],
    defaultNS: 'info',
    preload: ['en', 'pt'],
    debug: false
  });

module.exports = i18next;
