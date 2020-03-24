/**
 * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
 * =========================================
 * 组件初始化
 */

import isFunction from '@yelloxing/core.js/isFunction';
import isString from '@yelloxing/core.js/isString';

import { isValidKey } from '../../helper';

let uid = 1;

export function initMixin(iCrush) {

    // 对象初始化
    iCrush.prototype.$$init = function (options = {}) {

        this._options = options;

        // 唯一标志
        this._uid = uid++;

        // 需要双向绑定的数据
        this._data = isFunction(options.data) ? options.data() : options.data;

        // 挂载点
        this._el = isString(options.el) ? document.querySelector(options.el) : options.el;

        // 记录状态
        this.__isMounted = false; this.__isDestroyed = false;

        // 挂载方法
        for (let key in options.methods) {

            // 由于key的特殊性，注册前需要进行校验
            isValidKey(key);

            this[key] = options.methods[key];
        }

        // 挂载数据
        for (let key in this._data) {
            // 数据的校验在监听的时候进行
            this[key] = this._data[key];
        }

        // 挂载局部组件
        this.__componentLib_scope = {};
        for (let key in options.component) {
            this.__componentLib_scope[key] = options.component[key];
        }

        // 挂载局部指令
        this.__directiveLib_scope = {};
        for (let key in options.directive) {
            this.__directiveLib_scope[key] = options.directive[key];
        }

    };

};