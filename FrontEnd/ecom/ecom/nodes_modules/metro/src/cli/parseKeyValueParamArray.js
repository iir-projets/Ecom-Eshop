"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = coerceKeyValueArray;
var _querystring = _interopRequireDefault(require("querystring"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function coerceKeyValueArray(keyValueArray) {
  const result = Object.create(null);
  for (const item of keyValueArray) {
    if (item.indexOf("=") === -1) {
      throw new Error('Expected parameter to include "=" but found: ' + item);
    }
    if (item.indexOf("&") !== -1) {
      throw new Error('Parameter cannot include "&" but found: ' + item);
    }
    Object.assign(result, _querystring.default.parse(item));
  }
  return result;
}
