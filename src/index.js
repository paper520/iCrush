/**
 * 备注：除非特殊情况，_开头的表示内置方法，$开头的表示内置资源
 * =========================================
 * 整合全部资源，对外暴露调用接口
 */

import initGlobalAPI from './core/global-api/index';
import iCrush from './core/instance/index';

// 挂载全局方法
initGlobalAPI(iCrush);

import vBind from './modules/directives/bind';
import vModel from './modules/directives/model';

// 挂载内置指令
iCrush.directive("bind", vBind); // v-bind单向绑定
iCrush.directive("model", vModel); // v-model双向绑定

import { outHTML } from './utils/tool';
import isString from '@yelloxing/core.js/isString';
import isFunction from '@yelloxing/core.js/isFunction';
import { createRenderFactroy } from './core/instance/render';

// 把组件挂载到页面中去
iCrush.prototype._mount = function (el) {

  if (!isFunction(this.render)) {

    let template = this.template;

    // 如果template没有设置或设置的不是字符串
    if (!template || !isString(template)) {

      // 直接选择el
      template = outHTML(el);
    }

    // 根据template生成render函数
    this.render = createRenderFactroy(template);
  }

  // 一切准备好了以后，正式挂载
  this._mountComponent(el);
};

// 根据运行环境，导出接口
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = iCrush;
} else {
  window.iCrush = iCrush;
} 