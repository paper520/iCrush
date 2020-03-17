/**
 * 备注：__开头的表示内置方法，$$开头的表示内置资源
 * =========================================
 * 整合全部资源，对外暴露调用接口
 */

import initGlobalAPI from './core/global-api/index';
import iCrush from './core/instance/index';

// 挂载全局方法
initGlobalAPI(iCrush);

// 把组件挂载到页面中去
iCrush.prototype.__mount = function (el) {

  // todo
  
};

// 根据运行环境，导出接口
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = iCrush;
} else {
  window.iCrush = iCrush;
} 