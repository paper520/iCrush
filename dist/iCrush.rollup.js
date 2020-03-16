/*!
* iCrush v2.0.0-alpha
* (c) 2007-2020 心叶 git+https://github.com/yelloxing/iCrush.git
* License: MIT
*/

(function () {
    'use strict';

    /**
     * =========================================
     * iCrush对象
     */

    function iCrush(options) {
        if (!(this instanceof iCrush)) {
            throw new Error('iCrush is a constructor and should be called with the `new` keyword');
        }

        //   todo

    }

    /**
     * 备注：__开头的表示内置方法，$$开头的表示内置资源
     * =========================================
     * 整合全部资源，对外暴露调用接口
     */

    // 根据运行环境，导出接口
    if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = iCrush;
    } else {
      window.iCrush = iCrush;
    }

}());
