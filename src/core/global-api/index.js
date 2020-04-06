/**
 * =========================================
 * 挂载全局方法
 */

import mount from './mount';
import use from './use';

export default function (iCrush) {

    // 登记扩展内容
    iCrush.prototype.__directiveLib = {};
    iCrush.prototype.__componentLib = {};

    // 挂载
    mount(iCrush);
    use(iCrush);

};