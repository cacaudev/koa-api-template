module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "plugins": [
    "prettier",
    "eslint-plugin-import-helpers"
  ],
  "rules": {
    "no-new": "off",
    "no-prototype-builtins": "off",
    "no-restricted-syntax": "off",
    "max-classes-per-file": "off",
    "no-useless-constructor": "off",
    "no-underscore-dangle": "off",
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "max-len": [2, 90, 8],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "require-atomic-updates": "off"
  }
};
