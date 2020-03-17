/**
 * 备注：
 * $$开头的表示内部方法，__开头的表示内部资源
 * $开头的表示对外暴露的内置方法，_开头表示的是对外只读的内置资源
 * =========================================
 * 整合全部资源，对外暴露调用接口
 */

import initGlobalAPI from './core/global-api/index';
import iCrush from './core/instance/index';

// 挂载全局方法
initGlobalAPI(iCrush);

import isString from '@yelloxing/core.js/isString';
import isFunction from '@yelloxing/core.js/isFunction';

import { outHTML } from './tools';

import { createRenderFactroy } from './core/instance/render';

// 把组件挂载到页面中去
iCrush.prototype.$$mount = function (el) {

  if (!isFunction(this.$options.render)) {

    let template = this.template;

    // 如果template没有设置或设置的不是字符串
    if (!template || !isString(template)) {

      // 直接选择el
      template = outHTML(el);
    }

    // 根据template生成render函数
    this.$$render = createRenderFactroy(template);

  } else {
    this.$$render = this.$options.render;
  }

  // todo
  // 准备好以后挂载

  // 标记已经挂载
  this.__isMounted = true;

};

// 根据运行环境，导出接口
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = iCrush;
} else {
  window.iCrush = iCrush;
} 