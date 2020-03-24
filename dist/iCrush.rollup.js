/*!
* iCrush v1.0.0-alpha
* (c) 2007-2020 心叶 git+https://github.com/yelloxing/iCrush.git
* License: MIT
*/

(function () {
    'use strict';

    function mount (iCrush) {

        // 挂载指令
        iCrush.directive = function (name, options) {

            /*
             [生命周期]
              1.inserted:指令生效的时候
              2.update:被绑定于元素所在的组件中有数据更新时调用，而无论绑定值是否变化
              3.delete:只调用一次，指令与元素解绑时调用
            */
            iCrush.prototype.__directiveLib[name] = options;

        };

        // 挂载组件
        iCrush.component = function (name, options) {

            iCrush.prototype.__componentLib[name] = options;

        };

        // 挂载过滤器
        iCrush.filter = function (name, options) {

            iCrush.prototype.__filterLib[name] = options;

        };

    }

    function use (iCrush) {

        // 补充原型方法
        iCrush.use = function (extend) {
            extend.install.call(extend, iCrush);
        };

    }

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
     * =========================================
     * 挂载全局方法
     */

    function initGlobalAPI (iCrush) {

        // 登记扩展内容
        iCrush.prototype.__directiveLib = {};
        iCrush.prototype.__componentLib = {};
        iCrush.prototype.__filterLib = {};

        // 挂载
        mount(iCrush);
        use(iCrush);

        // 过滤器调用方法
        iCrush.prototype.$filter = function (filterName, ...params) {
            let filter = this.__filterLib[filterName];
            if (!isFunction(filter)) {
                console.error('[iCrush warn]: Filter not available：' + filterName);

                // 如果过滤器不存在，直接返回input
                return params[0];
            }
            return filter.apply(this, params);
        };

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
        container.innerHTML = template.replace(/[\n\f\r]/g, '').trim();
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
            console.error('[iCrush warn]: The beginning of _ or $ is not allowed：' + key);
        }
    }
    /**
     * 在指定上下文下获取字符串的值
     * @param {object} target 
     * @param {'string'} text 
     * @return {string} 解析后的字符串
     */
    function compilerText(target, text) {

        let getText = function (str) {
            return eval(str);
        };

        return getText.call(target, text);
    }

    /**
     * 把类似'DIV'、'ui-router'和'UI-ROUTER'等分别变成'div','uiRouter','uiRouter'等
     * @param {string} tagName 
     */
    function templateToName(tagName) {
        let lowerString = (tagName + "").toLowerCase();
        let upperString = (tagName + "").toUpperCase();

        let newTagName = "", accept_ = false;
        for (let i = 0; i < tagName.length; i++) {
            if (tagName[i] != "-") {
                if (accept_) {
                    newTagName += upperString[i];
                    accept_ = false;
                } else {
                    newTagName += lowerString[i];
                }
            } else {
                accept_ = true;
            }
        }
        return newTagName;
    }
    /**
     * 替换DOM
     * @param {DOM} oldEl 
     * @param {DOM} newEl 
     */
    function replaceDom(oldEl, newEl) {
        oldEl.parentNode.replaceChild(newEl, oldEl);
    }
    /**
     * 绑定事件
     * @param {DOM} dom 
     * @param {string} eventType
     * @param {function} callback 
     */
    function bindEvent(dom, eventType, callback) {

        if (window.attachEvent) {
            dom.attachEvent("on" + eventType, callback); // 后绑定的先执行
        } else {
            dom.addEventListener(eventType, callback, false);// 捕获
        }

    }
    /**
     * 解除绑定
     * @param {DOM} dom 
     * @param {string} eventType
     * @param {function} handler 
     */
    function unbindEvent(dom, eventType, handler) {
        if (window.detachEvent) {
            dom.detachEvent("on" + eventType, handler);
        } else {
            dom.removeEventListener(eventType, handler, false);// 捕获
        }

    }
    /**
     * 阻止冒泡
     * @param {event} event 
     */
    function stopPropagation(event) {
        event = event || window.event;
        if (event.stopPropagation) { //这是其他非IE浏览器
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
    /**
     * 阻止默认事件
     * @param {event} event  
     */
    function preventDefault(event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
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

            // 挂载方法
            for (let key in options.methods) {

                // 由于key的特殊性，注册前需要进行校验
                isValidKey(key);

                this[key] = options.methods[key];
            }

            // 挂载数据
            for (let key in this._data) {
                // 数据的校验在监听的时候进行
                this[key] = this._data[key];
            }

        };

    }

    function eventsMixin(iCrush) {

        iCrush.prototype.$$bindEvent = function (el, key, event) {

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
     * @param {string|json} tagName或组件 结点名称或组件
     * @param {json} attrs 属性
     * @param {array[vnode|string]} children 孩子元素 
     * @return {element} 返回vnode
     */
    function createElement (tagName, attrs = {}, children = []) {

        // 把组件和普通结点区分开
        // 当然，这里的普通结点也可能是动态组件和扩展的组件
        // 由于更多信息需要在当前对象中获取，推迟整理

        let newAttrs = {}, newChildren = [];
        if (isString(tagName)) {

            // 如果tagName表示是一个结点
            // 由于指令等写法灵活
            // 我们可以在这里对attrs进行整理

            for (let key in attrs) {

                // 如果是简化的@event方法
                if (/^@/.test(key)) {
                    newAttrs[key.replace(/^@/, 'i-on:')] = attrs[key];
                }

                // 如果是简化的:attr=""
                else if (/^:/.test(key)) {
                    newAttrs['i-bind' + key] = attrs[key];
                }

                // 其它的是普通的
                else {
                    newAttrs[key] = attrs[key];
                }

            }

            // 当然，children中可能是字符串类型的文本结点
            // 而这些文本结点可能包含{{}}这样的等
            // 为了提高后续的运算
            // 我们在这里提前标记好

            let child;
            for (let i = 0; i < children.length; i++) {
                child = children[i];
                if (isString(child)) {
                    if (/\{\{[^}]+\}\}/.test(child)) {

                        // 非普通文本我们把类似
                        // "xxx{{???}}xxx"
                        // 变成
                        // "xxx"+???+"xxx"
                        // 这样可以通过在特定上下文下执行获得最终的值 
                        // helper.js里面的compilerText方法提供此功能
                        newChildren.push({
                            type: 'bindText',
                            content: ("\" " + child + " \"").replace(/\{\{([^}]+)\}\}/g, "\"+this.$1+\"")
                        });
                    } else {

                        // 普通文本和bind文本区别开的目的是加速计算
                        // 针对普通文本
                        // 控制器的数据改变不需要去理会这里的内容
                        newChildren.push({
                            type: 'text',
                            content: child
                        });
                    }
                } else {

                    // 非字符串，也就是非文本的结点
                    newChildren.push(child);
                }
            }

        } else {
            return {
                // 一共分这几类：
                // 1.component组件
                // 2.tag普通标签
                // 3.text普通文本
                // 4.bindText存在动态文本
                // 其中none为未分配类型，表示需要进一步确认
                type: 'component',
                options: tagName,
                attrs: {},
                children: []
            };
        }

        return {
            type: 'none',
            tagName, attrs: newAttrs, children: newChildren
        };

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

    // 挂载结点的任务主要有以下内容：
    // 1.生成真实dom并挂载好
    // 2.收集指令，过滤器和组件信息（根据全局和局部的，进行抽取和校验），在数据更新的时候启动更新
    // 3.当前组件和父亲组件，包括子组件，还有事件等，在必要的时候挂载或启动，还有什么时候应该销毁等信息的登记

    function mountDom(that, key, pEl, iCrush) {

        let vnode = get(that, key), el;

        if (!vnode) {
            console.error('[iCrush warn]: vnode is undefined!');
            return;
        }

        // 如果是none，需要提前分类
        if (vnode.type == 'none') {
            let ttc = templateToName(vnode.tagName);
            if (that.__componentLib[ttc]) {
                vnode.options = that.__componentLib[ttc];
                vnode.type = 'component';
            } else {
                vnode.type = 'tag';
            }
        }

        // 1.组件
        if (vnode.type == 'component') {

            el = document.createElement('i-crush-component');
            pEl.appendChild(el);
            vnode.options.el = el;

            // 这相当于子组件，挂载好了以后，启动即可
            vnode.instance = new iCrush(vnode.options);
            vnode.instance.__parent = that;
        }

        // 2.普通标签
        else if (vnode.type == 'tag') {

            el = document.createElement(vnode.tagName);
            if (pEl.nodeName == 'I-CRUSH-COMPONENT' || pEl._nodeName == 'I-CRUSH-COMPONENT') {

                // 作为临时占位的结点，我们应该替换而不是追加
                replaceDom(pEl, el);
                that._el = el;

            } else {
                pEl.appendChild(el);
            }

            /**
             * 组件的属性，包括通过属性传递数据等先不考虑
             * 我们目前只支持普通标签上的指令
             */

            for (let key in vnode.attrs) {
                let value = vnode.attrs[key];
                let names = (key + ":").split(':');
                let directive = that.__directiveLib[templateToName(names[0])];

                // 如果是指令
                if (directive) {
                    that.__directiveTask.push({
                        el,
                        ...directive,
                        value,
                        type: names[1]
                    });
                }

                // 普通属性的话，直接设置即可
                else {
                    el.setAttribute(key, value);
                }
            }

            // 挂载好父亲以后，挂载孩子
            for (let i = 0; i < vnode.children.length; i++) {
                mountDom(that, key + ".children[" + i + "]", el, iCrush);
            }
        }

        // 3.普通文本
        else if (vnode.type == 'text') {

            el = document.createTextNode(vnode.content);
            pEl.appendChild(el);

        }

        // 4.绑定文本
        else if (vnode.type == 'bindText') {

            el = document.createTextNode(compilerText(that, vnode.content));
            pEl.appendChild(el);

            that.__bindTextTask.push({
                el,
                content: vnode.content
            });

        }

        // 其它应该抛错
        else {
            console.error('[iCrush warn]: Type not expected：' + vnode.type);
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

            if (isFunction(that[key])) {
                console.error('[iCrush warn]: Data property "' + key + '" has already been defined as a Method.');
            }

            let value = that._data[key];

            that[key] = value;

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

            this.__directiveTask = [];
            this.__componentTask = [];
            this.__filterTask = [];
            this.__bindTextTask = [];

            // 以指令为例，指令在挂载的真实DOM销毁的时候，应该主动销毁自己
            // 类似这样的管理应该由指令自己提供
            mountDom(this, '_vnode', this._el, iCrush);

            // 执行指令：inserted
            for (let i = 0; i < this.__directiveTask.length; i++) {
                let directive = this.__directiveTask[i];
                if (isFunction(directive.inserted)) {
                    directive.inserted(directive.el, {
                        target: this,
                        exp: directive.value,
                        value: get(this, directive.value),
                        type: directive.type
                    });
                }
            }

            // 挂载好了以后，启动监听
            watcher(this);

            // 标记已经挂载
            this.__isMounted = true;
            this.$$lifecycle('mounted');
        };

        // 第一次或数据改变的时候，更新页面
        iCrush.prototype.$$updateComponent = function () {
            this.$$lifecycle('beforeUpdate');

            // 执行指令：update
            for (let i = 0; i < this.__directiveTask.length; i++) {
                let directive = this.__directiveTask[i];
                if (isFunction(directive.update)) {
                    directive.update(directive.el, {
                        target: this,
                        exp: directive.value,
                        value: get(this, directive.value),
                        type: directive.type
                    });
                }
            }

            // 更新{{}}
            for (let i = 0; i < this.__bindTextTask.length; i++) {
                let bindText = this.__bindTextTask[i];
                let el = document.createTextNode(compilerText(this, bindText.content));
                replaceDom(bindText.el, el);
                this.__bindTextTask[i].el = el;
            }

            this.$$lifecycle('updated');
        };

        // 销毁组件，释放资源
        iCrush.prototype.$$destroyComponent = function () {
            this.$$lifecycle('beforeDestroy');

            // 执行指令：delete
            for (let i = 0; i < this.__directiveTask.length; i++) {
                let directive = this.__directiveTask[i];
                if (isFunction(directive.delete)) {
                    directive.delete(directive.el, {
                        target: this,
                        exp: directive.value,
                        value: get(this, directive.value),
                        type: directive.type
                    });
                }
            }

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

                    // 对于空格，tab等空白文字结点，我们认为可以直接剔除
                    if (!/^[\x20\t]+$/.test(childNodes[i].textContent)) {
                        childRenders.push(childNodes[i].textContent);
                    }

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
            console.error('[iCrush warn]: iCrush is a constructor and should be called with the `new` keyword');
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
    eventsMixin(iCrush);// 处理事件相关
    lifecycleMixin(iCrush);// 和组件的生命周期相关调用
    renderMixin(iCrush);// 组件渲染或更新相关

    /**
     * 用于数据单向绑定
     * =========================================
     * v-bind:XXX="express"
     */

    let update = function (el, binding) {

      // 如果有type表示给属性赋值
      if (isString(binding.type) && binding.type.length > 0) {
        el.setAttribute(binding.type, binding.value);
      }

      // 否则是设置内容或值
      else {
        el.value = el.textContent = binding.value;
      }

    };

    var iBind = {
      inserted: update,
      update
    };

    /**
     * [可以使用的修饰符]
     * .prevent 阻止默认事件
     * .stop    阻止冒泡
     * .once    只执行一次
     */
    var iOn = {
      inserted: function (el, binding) {

        let types = binding.type.split('.'), modifier = {

          "prevent": false,
          "stop": false,
          "once": false

        }, callback = function (event) {

          if (modifier.stop) stopPropagation(event);
          if (modifier.prevent) preventDefault(event);

          let exps = /^([^(]+)(\([^)]{0,}\)){0,1}/.exec(binding.exp), params = [], oralParams = [];

          if (exps[2]) {

            // 获取原始的数据
            let temp = exps[2].replace(/^\(/, '').replace(/\)$/, '').trim();
            if (temp.length > 0) {
              oralParams = temp.split(',');
            }
          }

          // 解析
          for (let i = 0; i < oralParams.length; i++) {
            let param = oralParams[i];
            if (!/^\d/.test(param) && "true" != param && "false" != param && "NAN" != param && !/["']/.test(param)) {
              param = compilerText(binding.target, "this." + param);
            } else {
              param = compilerText(binding.target, param);
            }
            params.push(param);
          }

          binding.target[exps[1]].apply(binding.target, params);

          if (modifier.once) {
            unbindEvent(el, types[0], callback);
          }

        };

        for (let i = 1; i < types.length; i++) {
          modifier[types[i]] = true;
        }

        bindEvent(el, types[0], callback);
      }
    };

    /**
     * 设置值的基本方法（没有进行值检查）
     *
     * @private
     * @param {Object} object 设置的对象
     * @param {string} key 需要设置的属性
     * @param {*} value 设置的值
     */
    function baseAssignValue (object, key, value) {
        if (key == '__proto__') {
            Object.defineProperty(object, key, {
                'configurable': true,
                'enumerable': true,
                'value': value,
                'writable': true
            });
        } else {
            object[key] = value;
        }
    }

    /**
     *设置对象的值
     *
     * @private
     * @param {Object} object 设置的对象
     * @param {string} key 需要设置的属性
     * @param {*} value 设置的值
     */
    function assignValue (object, key, value) {
        baseAssignValue(object, key, value);
    }

    /**
     * 设置一个对象属性值的基础方法。
     *
     * @private
     * @param {Object} object 设置的对象
     * @param {Array|string} path 对象上设置值的路径
     * @param {*} value 设置的值
     * @param {*} customizer 可选，一个函数，用于返回补充的类型（比如[],{}等）
     * @returns {Object} 返回一个对象
     */
    function baseSet (object, path, value, customizer) {
        if (!isObject(object)) {
            return object;
        }
        path = castPath(path, object);

        let nested = object;

        for (let index = 0; index < path.length; index++) {
            const key = toKey(path[index]);
            let newValue = value;

            // 如果不是最后一个，需要一些检测
            if (index + 1 != path.length) {

                const objValue = nested[key];

                // 可能有的时候，原来的对象层次不足，需要补充，这里是选择应该补充什么类型
                if (!isObject(objValue)) {

                    newValue = customizer ? customizer(objValue, key, nested) : undefined;
                    if (newValue === undefined) {
                        newValue = {};
                    }
                } else {
                    newValue = objValue;
                }
            }

            assignValue(nested, key, newValue);
            nested = nested[key];
        }

        return object;
    }

    /**
     * 设置object的属性path的新值，返回设置后的对象。
     *
     * @since V0.1.0
     * @public
     * @param {Object} object 设置的对象
     * @param {Array|string} path 对象上设置值的路径
     * @param {*} value 设置的值
     * @param {*} customizer 可选，一个函数，用于返回补充的类型（比如[],{}等）
     * @returns {Object} 返回一个对象
     * @example
     *
     * var object={a:{b:[1,2,3]}};
     *
     * set(object,'a.b.c',10)
     * // {a:{b:[1,2,3]}}
     */
    function set (object, path, value, customizer) {
        customizer = typeof customizer === 'function' ? customizer : undefined;
        return object == null ? object : baseSet(object, path, value, customizer);
    }

    /**
     * 用于数据双向绑定
     * =========================================
     * v-model="express"
     */

    var iModel = {
      inserted: function (el, binding) {
        el.value = binding.value;
        bindEvent(el, 'input', () => {
          set(binding.target, binding.exp, el.value);
        });

      },
      update: function (el, binding) {
        el.value = binding.value;
      }
    };

    var component = {};

    var number = {};

    /**
     * 备注：
     * $$开头的表示内部方法，__开头的表示内部资源
     * $开头的表示对外暴露的内置方法，_开头表示的是对外只读的内置资源
     * =========================================
     * 整合全部资源，对外暴露调用接口
     */

    // 挂载全局方法
    initGlobalAPI(iCrush);
     iCrush.directive('iBind', iBind);
     iCrush.directive('iOn', iOn);
     iCrush.directive('iModel', iModel);
     iCrush.component('component', component);
     iCrush.filter('number', number);

    // 把组件挂载到页面中去
    iCrush.prototype.$$mount = function () {

      if (!isFunction(this._options.render)) {

        let template = this.template;

        // 如果template没有设置或设置的不是字符串
        if (!template || !isString(template)) {

          // 直接选择el
          template = outHTML(this._el);
          this._el._nodeName = 'I-CRUSH-COMPONENT';
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
