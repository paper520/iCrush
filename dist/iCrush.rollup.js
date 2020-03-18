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
     * 判断一个值是不是String。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是String返回true，否则返回false
     */
    function isString (value) {
        const type = typeof value;
        return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]');
    }

    /**
     * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
     * =========================================
     * 组件初始化
     */

    let uid = 1;

    function initMixin(iCrush) {

        // 对象初始化
        iCrush.prototype.$$init = function (options = {}) {

            this._options = options;

            // 唯一标志
            this._uid = uid++;

            // 需要双向绑定的数据
            this._data = isFunction(options.data) ? options.data() : options.data;

            // 挂载点
            this._el = isString(options.el) ? document.querySelector(options.el) : options.el;

            // 记录状态
            this.__isMounted = false; this.__isDestroyed = false;

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
        iCrush.prototype.$$lifecycle = function (callbackName) {

            // beforeCreate
            if (isFunction(callbackName)) {
                callbackName();
                return;
            }

            if ([

                // 创建组件
                'created',

                // 挂载组件
                'beforeMount', 'mounted',

                // 更新组件
                'beforeUpdate', 'updated',

                // 销毁组件
                'beforeDestroy', 'destroyed'

            ].indexOf(callbackName) > -1 && isFunction(this._options[callbackName])) {
                this._options[callbackName].call(this);
            }

        };

    }

    /**
     * createElement方法
     * =========================================
     * 组件控制范围内的重要信息收集
     */

    /**
     * 创建vnode方法，并收集信息
     * @param {string} tagName 结点名称
     * @param {json} attrs 属性
     * @param {array[vnode|string]} children 孩子元素 
     * @return {element} 返回vnode
     */
    function createElement (tagName, attrs, children) {

        // todo

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
     * 本文件用于提供一些零碎的方法
     */

    /**
     * 获取结点的outHTML
     * @param {node} el 结点
     * @return {string} 字符串模板
     */
    function outHTML(el) {
        if (el.outerHTML) {
            return el.outerHTML;
        } else {
            const container = document.createElement('div');
            container.appendChild(el.cloneNode(true));
            return container.innerHTML;
        }
    }
    /**
     * 把字符串模板变成结点
     * @param {node|string} template 结点或字符串模板
     * @return {node} 结点
     */
    function toNode(template) {
        if (isElement(template)) {
            return template;
        }

        // 如果是字符串模板
        const container = document.createElement('div');
        container.innerHTML = template;
        return container.firstElementChild;
    }

    /**
     * 判断一个值是不是文本结点。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是结点元素返回true，否则返回false
     */
    function isText (value) {
        return value !== null && typeof value === 'object' &&
            value.nodeType === 3 && !isPlainObject(value);
    }

    function renderMixin(iCrush) {

        // 根据render生成dom挂载到挂载点
        // 并调用watcher启动数据监听
        // 并调用events方法开启@事件注册
        // 并记录其中的组件，指令和{{}}等
        iCrush.prototype.$$mountComponent = function () {
            this.$$lifecycle('beforeMount');

            /**
             * 挂载的意义就是由当前组件来管理和调度一片区域
             */

            // 获取虚拟结点
            this._vnode = this.$$render(createElement);

            // 标记已经挂载
            this.__isMounted = true;
            this.$$lifecycle('mounted');
        };

        // 第一次或数据改变的时候，更新页面
        iCrush.prototype.$$updateComponent = function () {
            this.$$lifecycle('beforeUpdate');

            this.$$lifecycle('updated');
        };

        // 销毁组件，释放资源
        iCrush.prototype.$$destroyComponent = function () {
            this.$$lifecycle('beforeDestroy');

            this.$$lifecycle('destroyed');
        };

    }
    /**
     * 根据字符串模板生成render函数
     * @param {string} template 字符串模板
     * @return {function} render函数
     */
    function createRenderFactroy(template) {

        let doit = function (node, createElement) {
            let childNodes = node.childNodes, childRenders = [];
            for (let i = 0; i < childNodes.length; i++) {

                // 如果是文本结点
                if (isText(childNodes[i])) {
                    childRenders.push(childNodes[i].textContent);
                }

                // 如果是标签结点
                else if (isElement(childNodes[i])) {
                    childRenders.push(doit(childNodes[i], createElement));
                }

            }

            // 记录属性
            let attrs = {};
            for (let i = 0; i < node.attributes.length; i++) {
                attrs[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
            }

            // 返回生成的元素
            return createElement(node.tagName, attrs, childRenders);
        };

        return function (createElement) {
            return doit(toNode(template), createElement);
        };

    }

    /**
     * =========================================
     * iCrush对象
     */

    function iCrush(options) {
        if (!(this instanceof iCrush)) {
            throw new Error('iCrush is a constructor and should be called with the `new` keyword');
        }

        this.$$lifecycle(options.beforeCreate);

        // 初始化对象
        this.$$init(options);

        this.$$lifecycle('created');

        // 如果没有设置挂载点
        // 表示该组件不挂载
        // 不挂载的话，render或template也不会去解析
        // 或许可以在一定阶段以后，再主动去挂载，这样有益于提高效率
        if (isElement(this._el)) {

            // 挂载组件到页面
            this.$$mount();

        }

    }

    /**
     * 下面是混入几大核心功能的处理方法
     */
    initMixin(iCrush);// 初始化对象
    lifecycleMixin(iCrush);// 和组件的生命周期相关调用
    renderMixin(iCrush);// 组件渲染或更新相关

    /**
     * 备注：
     * $$开头的表示内部方法，__开头的表示内部资源
     * $开头的表示对外暴露的内置方法，_开头表示的是对外只读的内置资源
     * =========================================
     * 整合全部资源，对外暴露调用接口
     */

    // 把组件挂载到页面中去
    iCrush.prototype.$$mount = function () {

      if (!isFunction(this._options.render)) {

        let template = this.template;

        // 如果template没有设置或设置的不是字符串
        if (!template || !isString(template)) {

          // 直接选择el
          template = outHTML(this._el);
        }

        // 根据template生成render函数
        this.$$render = createRenderFactroy(template);

      } else {
        this.$$render = this._options.render;
      }

      // 准备好以后挂载
      this.$$mountComponent();

    };

    // 根据运行环境，导出接口
    if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = iCrush;
    } else {
      window.iCrush = iCrush;
    }

}());
