/**
 * =========================================
 * 事件相关的处理
 */

import xhtml from 'xhtml.js';

export function eventsMixin(iCrush) {

  // 具体的绑定@event事件的方法
  iCrush.prototype._bind = function (el, type, callbackTemplate) {
    let _this = this;

    // 方法名称
    let callback_name = callbackTemplate.replace(/\([^)]{0,}\)/, '');
    let callback_params = callbackTemplate.replace(/[^(]{1,}\({0,1}([^)]{0,})\){0,1}/, "$1").split(',');

    // 绑定
    xhtml(el).bind(type, function () {

      // 执行方法
      // 目前不支持传递变量
      _this.methods[callback_name].apply(_this, callback_params);
    });
  };

};