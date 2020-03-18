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
     * 判断一个值是不是symbol。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是symbol返回true，否则返回false
     */
    function isSymbol (value) {
        const type = typeof value;
        return type === 'symbol' || (type === 'object' && value !== null && getType(value) === '[object Symbol]');
    }

    /**
     * 判断是不是一个对象上的属性
     *
     * @private
     * @param {Array|string} path 属性或路径
     * @param {Object} object 操作的对象
     * @returns {boolean} 如果是返回true，否则返回false
     */

    function isKey (value, object) {

        if (Array.isArray(value)) {
            return false;
        }

        const type = typeof value;
        if (type == 'number' || type == 'boolean' || value == null || isSymbol(value)) {
            return true;
        }

        return (object !== null && value in Object(object)) || /^\w*$/.test(value);
    }

    /**
     * 把字符串路径变成简单的数组
     *
     * @private
     * @param {string} value 需要解析的路径字符串
     * @returns {Array} 返回属性数组
     */
    function stringToPath (value) {
        return value.replace(/\[/g, ".").replace(/\]/g, '').replace(/"/g, "").replace(/'/g, "").split('.');
    }

    /**
     * 把属性字符串统一变成数组（数组每个值是一个简单的属性）
     *
     * @private
     * @param {Array|string} path 属性或路径
     * @param {Object} object 操作的对象
     * @returns {Array} 返回属性数组
     */
    function castPath (value, object) {
        if (Array.isArray(value)) {
            return value;
        }
        return isKey(value, object) ? [value] : stringToPath(value);

    }

    const INFINITY = 1 / 0;

    /**
     * 如果value不是字符串或者symbol，就变成字符串
     *
     * @private
     * @param {*} value 需要检查的值
     * @returns {string|symbol} 返回key
     */
    function toKey (value) {
        if (typeof value === 'string' || isSymbol(value)) {
            return value;
        }

        const result = `${value}`;
        return (result === '0' && (1 / value) === -INFINITY) ? "-0" : result;
    }

    /**
     * 获取一个对象属性值的基础方法，没有默认值。
     *
     * @private
     * @param {Object} object 操作的对象
     * @param {Array|string} path 属性或路径
     * @returns {*} 返回设置的结果
     */
    function baseGet (object, path) {

        // 统一把路径变成['a','b','c',...]这种
        path = castPath(path, object);

        let index = 0;
        for (; index < path.length && object !== null; index++) {
            object = object[toKey(path[index])];
        }

        return (index && index === path.length) ? object : undefined;
    }

    /**
     * 获取object的属性path的值。如果返回的值是undefined，
     * defaultValue就作为返回值返回。
     *
     * @since V0.1.0
     * @public
     * @param {Object} object 查询的对象
     * @param {Array|string} path 对象上查询值的路径
     * @param {*} defaultValue 值为undefined的时候的返回值
     * @returns {*} 返回结果
     * @example
     *
     * var object={a:{b:[1,2,3]}};
     *
     * get(object,'a.b') or
     * get(object,['a','b'])
     * // [1,2,3]
     *
     * get(object,'a["b"][1]')
     * // 2
     *
     * get(object,'a.c','default')
     * // 'default'
     */

    function get (object, path, defaultValue) {
        let result = object == null ? undefined : baseGet(object, path);
        return result === undefined ? defaultValue : result;
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
     * 判断是否是合法的方法或数据key
     * @param {string} key 
     */
    function isValidKey(key) {
        // 判断是不是_或者$开头的
        // 这两个内部预留了
        if (/^[_$]/.test(key)) {
            throw new Error('The beginning of _ or $ is not allowed：' + key);
        }
    }

    /**
     * =========================================
     * 通过proxy的方式，对this.data中的数据进行拦截
     */

    function watcher (that) {

        for (let key in that._data) {

            // 由于key的特殊性，注册前需要进行校验
            isValidKey(key);

            let value = get(that._data, key);

            // 针对data进行拦截，后续对data的数据添加不会自动监听了
            // this._data的数据是初始化以后的，后续保持不变，方便组件被重新使用（可能的设计，当前预留一些余地）
            // 当前对象数据会和方法一样直接挂载在根节点
            Object.defineProperty(that, key, {
                get() {
                    return value;
                },
                set(newValue) {
                    value = newValue;

                    // 数据改变，触发更新
                    that.$$updateComponent();

                }
            });
        }

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


            //  挂载好了以后，启动监听
            watcher(this);

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
