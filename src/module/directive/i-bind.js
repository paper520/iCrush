/**
 * 用于数据单向绑定
 * =========================================
 * v-bind="express"
 */

import isString from '@yelloxing/core.js/isString';

let update = function (el, binding) {

  console.log(el, binding);

};

export default {
  inserted: update,
  update
};