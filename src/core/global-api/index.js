/**
 * =========================================
 * 挂载全局方法
 */

import mount from './mount';
import use from './use';

export default function (iCrush) {

    iCrush.prototype.__directiveLib = {};
    iCrush.prototype.__componentLib = {};
    iCrush.prototype.__filterLib = {};

    mount(iCrush);
    use(iCrush);

};