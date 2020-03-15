/**
 * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
 * =========================================
 * 组件初始化
 */

import isFunction from '@yelloxing/core.js/isFunction';

let uid = 1;

export function initMixin(iCrush) {

  // 对象初始化
  iCrush.prototype._init = function (options) {

    this.$uid = uid++;
    options = options || {};

    for (let key in options) {
      // 判断是不是_或者$开头的
      // 这二个内部预留了
      if (/^[_$]/.test(key)) {
        throw new Error('The beginning of _and $is not allowed：' + key);
      }
      this[key] = options[key];
    }

    // 数据预处理
    if (isFunction(this.data)) {
      this.data = this.data();
    }

  };

};