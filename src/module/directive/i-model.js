/**
 * 用于数据双向绑定
 * =========================================
 * v-model="express"
 */

import { bindEvent } from '../../helper';
import set from '@yelloxing/core.js/set';

export default {
  inserted: function (el, binding) {
    el.value = binding.value;
    bindEvent(el, 'input', () => {
      set(binding.target, binding.exp, el.value);
    });

  },
  update: function (el, binding) {
    el.value = binding.value;
  }
};