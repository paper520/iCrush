/**
 * =========================================
 * iCrush对象
 */

import { initMixin } from './init';
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './render';

function iCrush(options) {
    if (!(this instanceof iCrush)) {
        throw new Error('iCrush is a constructor and should be called with the `new` keyword');
    }

    //   todo

}

/**
 * 下面是混入几大核心功能的处理方法
 */
initMixin(iCrush);// 初始化对象
eventsMixin(iCrush);// 处理事件相关
lifecycleMixin(iCrush);// 和组件的生命周期相关调用
renderMixin(iCrush);// 组件渲染或更新相关

export default iCrush;