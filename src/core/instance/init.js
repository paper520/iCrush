/**
 * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
 * =========================================
 * 组件初始化
 */

import isFunction from '@yelloxing/core.js/isFunction';

let uid = 1;

export function initMixin(iCrush) {

    // 对象初始化
    iCrush.prototype.__init = function (options) {

        this.$uid = uid++;
        options = options || {};

        //  todo

    };

};