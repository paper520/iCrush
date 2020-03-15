/**
 * 用于数据单向绑定
 * =========================================
 * v-bind="express"
 */

import isString from '@yelloxing/core.js/isString';

let update = function (el, binding) {

  if (binding.value && !isString(binding.value)) {
    binding.value = JSON.stringify(binding.value);
  }

  // 默认或者value类型，表示赋值
  if (binding.type == '' || binding.type == 'value') {
    el.value = el.textContent = binding.value;
  }

  // 负责设置属性
  else {
    el.setAttribute(binding.type, binding.value);
  }

};

export default {
  inserted: update,
  update
};