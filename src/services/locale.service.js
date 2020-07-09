/*
 * Name: locale.js
 * Description: Locale service file.
 * Author: Cacaudev
 * Date: 01/11/2019
*/

"use strict";

const i18next = require("../i18n/config");

class LocaleService {
  /**
   * @class
   * @summary Service to translate strings
   * @param i18nProvider The i18n provider
   * @param {string} locale Language to startup the service instance. Default: en
   * @example
   * let i18nService = new LocaleService("en");
   */
  constructor(locale = "en") {
    this.i18nProvider = i18next;
    this.setLocale(locale);
  }

  /**
   *
   * @returns {string} The current locale code
   * @example
   * let language = LocaleService.getCurrentLocale();
   */
  getCurrentLocale() {
    return this.i18nProvider.language;
  }

  /**
   *
   * @returns string[] The list of available locale codes
   */
  /*getLocales() {
    return this.i18nProvider.getLocales();
  }*/

  /**
   * @method
   * @param locale The locale to set. Must be from the list of available locales.
   * @example
   * LocaleService.setLocale("en");
   */
  setLocale(locale) {
    this.i18nProvider.changeLanguage(locale);
  }

  /**
   * @method
   * @summary Translate function
   * @param {string} key_path Namespace:Key
   * @returns {string} Translated string
   * @example
   * let new_string = await i18nService._t("info:welcome");
   */
  _t(key_path) {
    return this.i18nProvider.t(key_path);
  }
}

module.exports = { LocaleService };
