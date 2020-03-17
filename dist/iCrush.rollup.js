/*!
* iCrush v1.0.0-alpha
* (c) 2007-2020 心叶 git+https://github.com/yelloxing/iCrush.git
* License: MIT
*/

(function () {
    'use strict';

    const toString = Object.prototype.toString;

    /**
     * 获取一个值的类型字符串[object type]
     *
     * @private
     * @param {*} value 需要返回类型的值
     * @returns {string} 返回类型字符串
     */
    function getType (value) {
        if (value == null) {
            return value === undefined ? '[object Undefined]' : '[object Null]';
        }
        return toString.call(value);
    }

    /**
     * 判断一个值是不是Object。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是Object返回true，否则返回false
     */
    function isObject (value) {
        const type = typeof value;
        return value != null && (type === 'object' || type === 'function');
    }

    /**
     * 判断一个值是不是Function。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是Function返回true，否则返回false
     */
    function isFunction (value) {
        if (!isObject(value)) {
            return false;
        }

        const type = getType(value);
        return type === '[object Function]' || type === '[object AsyncFunction]' ||
            type === '[object GeneratorFunction]' || type === '[object Proxy]';
    }

    /**
     * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
     * =========================================
     * 组件初始化
     */

    let uid = 1;

    function initMixin(iCrush) {

        // 对象初始化
        iCrush.prototype.__init = function (options) {

            this.$uid = uid++;

            //  todo

        };

    }

    /**
     * =========================================
     * 组件的生命周期
     */

    function lifecycleMixin(iCrush) {

        // 生命周期调用钩子
        // 整个过程，进行到对应时期，都需要调用一下这里对应的钩子
        // 整合在一起的目的是方便维护
        iCrush.prototype.__lifecycle = function (callbackName) {

            // beforeCreate
            if (isFunction(callbackName)) {
                callbackName();
                return;
            }

            debugger

            if ([

                // 创建组件
                'created',

                // 挂载组件
                'beforeMount', 'mounted',

                // 更新组件
                'beforeUpdate', 'updated',

                // 销毁组件
                'beforeDestroy', 'destroyed'

            ].indexOf(callbackName) > -1 && isFunction(this[callbackName])) {
                this[callbackName].call(this);
            }

        };

    }

    /**
     * 判断一个值是不是一个朴素的'对象'
     *
     * @private
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
     */

    function isPlainObject (value) {
        if (value === null || typeof value !== 'object' || getType(value) != '[object Object]') {
            return false;
        }

        // 如果原型为null
        if (Object.getPrototypeOf(value) === null) {
            return true;
        }

        let proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
    }

    /**
     * 判断一个值是不是结点元素。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是结点元素返回true，否则返回false
     */
    function isElement (value) {
        return value !== null && typeof value === 'object' &&
            (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) &&
            !isPlainObject(value);
    }

    /**
     * =========================================
     * iCrush对象
     */

    function iCrush(options) {
        if (!(this instanceof iCrush)) {
            throw new Error('iCrush is a constructor and should be called with the `new` keyword');
        }

        this.__lifecycle(options.beforeCreate);

        // 初始化对象
        this.__init(options);

        this.__lifecycle('created');

        // 如果没有设置挂载点
        // 表示该组件不挂载
        // 不挂载的话，render或template也不会去解析
        // 或许可以在一定阶段以后，在主动去挂载，这样有益于提高效率
        if (isElement(this.el)) {
            this.__lifecycle('beforeMount');

            // 挂载组件到页面
            this.__mount(this.el);

            this.__lifecycle('mounted');
        }

    }

    /**
     * 下面是混入几大核心功能的处理方法
     */
    initMixin(iCrush);// 初始化对象
    lifecycleMixin(iCrush);// 和组件的生命周期相关调用

    /**
     * 备注：__开头的表示内置方法，$$开头的表示内置资源
     * =========================================
     * 整合全部资源，对外暴露调用接口
     */

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

}());
