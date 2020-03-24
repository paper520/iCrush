/**
 * =========================================
 * 挂载全局方法
 */

import mount from './mount';
import use from './use';

import isFunction from '@yelloxing/core.js/isFunction';

export default function (iCrush) {

    // 登记扩展内容
    iCrush.prototype.__directiveLib = {};
    iCrush.prototype.__componentLib = {};
    iCrush.prototype.__filterLib = {};

    // 挂载
    mount(iCrush);
    use(iCrush);

    // 过滤器调用方法
    iCrush.prototype.$filter = function (filterName, ...params) {
        let filter = this.__filterLib[filterName];
        if (!isFunction(filter)) {
            console.error('[iCrush warn]: Filter not available：' + filterName);

            // 如果过滤器不存在，直接返回input
            return params[0];
        }
        return filter.apply(this, params);
    };

};