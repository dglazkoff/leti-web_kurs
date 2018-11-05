/* eslint-disable consistent-return */
const isArray = require('lodash/isArray');
const mergeWith = require('lodash/mergeWith');

function mergeConfigs(firstConfig, secondConfig) {
  function concatArray(objValue, srcValue) {
    if (isArray(objValue) && isArray(srcValue)) {
      return objValue.concat(srcValue);
    }
  }
  return mergeWith(firstConfig, secondConfig, concatArray);
}

module.exports = mergeConfigs;
