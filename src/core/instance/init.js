/**
 * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
 * =========================================
 * 组件初始化
 */

import isFunction from '@yelloxing/core.js/isFunction';
import isString from '@yelloxing/core.js/isString';

let uid = 1;

export function initMixin(iCrush) {

    // 对象初始化
    iCrush.prototype.$$init = function (options = {}) {

        this.$options = options;

        // 唯一标志
        this.__uid = uid++;

        // 标记是iCrush对象
        this.__isICrush = true;

        // 需要双向绑定的数据
        this._data = isFunction(options.data) ? options.data() : options.data;

        // 挂载点
        this._el = isString(options.el) ? document.querySelector(options.el) : options.el;

        // 记录状态
        this.__isMounted = false; this.__isDestroyed = false;

    };

};