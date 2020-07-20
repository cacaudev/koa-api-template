/*
 * @Author: cacaudev
 * @Date: 2020-06-26 16:44:10
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-20 15:15:25
 */

const languages = ['en', 'pt'];
const lngNamespaces = ['info'];
const langs = {};

languages.map((lng) => {
  const obj = { translation: {} };
  lngNamespaces.map((namespace) => {
    obj[namespace] = require(`./${lng}/${namespace}.json`);
  });
  langs[lng] = obj;
});

export { languages, langs, lngNamespaces };
