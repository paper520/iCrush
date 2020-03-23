"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
* iCrush v1.0.0-alpha
* (c) 2007-2020 心叶 git+https://github.com/yelloxing/iCrush.git
* License: MIT
*/
(function () {
  'use strict';

  function mount(iCrush) {
    // 挂载指令
    iCrush.directive = function (name, options) {
      iCrush.prototype.__directiveLib[name] = options;
    }; // 挂载组件


    iCrush.component = function (name, options) {
      iCrush.prototype.__componentLib[name] = options;
    }; // 挂载过滤器


    iCrush.filter = function (name, options) {
      iCrush.prototype.__filterLib[name] = options;
    };
  }

  function use(iCrush) {
    // 补充原型方法
    iCrush.use = function (extend) {
      extend.install.call(extend, iCrush);
    };
  }
  /**
   * =========================================
   * 挂载全局方法
   */


  function initGlobalAPI(iCrush) {
    iCrush.prototype.__directiveLib = {};
    iCrush.prototype.__componentLib = {};
    iCrush.prototype.__filterLib = {};
    mount(iCrush);
    use(iCrush);
  }

  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @private
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType(value) {
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


  function isObject(value) {
    var type = _typeof(value);

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


  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object Proxy]';
  }
  /**
   * 判断一个值是不是String。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */


  function isString(value) {
    var type = _typeof(value);

    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
  }
  /**
   * 判断一个值是不是一个朴素的'对象'
   *
   * @private
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
   */


  function isPlainObject(value) {
    if (value === null || _typeof(value) !== 'object' || getType(value) != '[object Object]') {
      return false;
    } // 如果原型为null


    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

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


  function isElement(value) {
    return value !== null && _typeof(value) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
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
      var container = document.createElement('div');
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
    } // 如果是字符串模板


    var container = document.createElement('div');
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
   * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
   * =========================================
   * 组件初始化
   */


  var uid = 1;

  function initMixin(iCrush) {
    // 对象初始化
    iCrush.prototype.$$init = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._options = options; // 唯一标志

      this._uid = uid++; // 需要双向绑定的数据

      this._data = isFunction(options.data) ? options.data() : options.data; // 挂载点

      this._el = isString(options.el) ? document.querySelector(options.el) : options.el; // 记录状态

      this.__isMounted = false;
      this.__isDestroyed = false; // 挂载方法

      for (var key in options.methods) {
        // 由于key的特殊性，注册前需要进行校验
        isValidKey(key);
        this[key] = options.methods[key];
      }
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

      if ([// 创建组件
      'created', // 挂载组件
      'beforeMount', 'mounted', // 更新组件
      'beforeUpdate', 'updated', // 销毁组件
      'beforeDestroy', 'destroyed'].indexOf(callbackName) > -1 && isFunction(this._options[callbackName])) {
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


  function createElement(tagName, attrs, children) {
    // 把组件和普通结点区分开
    // 当然，这里的普通结点也可能是动态组件和扩展的组件
    // 由于更多信息需要在当前对象中获取，推迟整理
    var newAttrs = {},
        newChildren = [];

    if (isString(tagName)) {
      // 如果tagName表示是一个结点
      // 由于指令等写法灵活
      // 我们可以在这里对attrs进行整理
      for (var key in attrs) {
        // 如果是简化的@event方法
        if (/^@/.test(key)) {
          newAttrs[key.replace(/^@/, 'v-on:')] = attrs[key];
        } // 如果是简化的:attr=""
        else if (/^:/.test(key)) {
            newAttrs['v-bind' + key] = attrs[key];
          } // 其它的是普通的
          else {
              newAttrs[key] = attrs[key];
            }
      } // 当然，children中可能是字符串类型的文本结点
      // 而这些文本结点可能包含{{}}这样的等
      // 为了提高后续的运算
      // 我们在这里提前标记好


      var child;

      for (var i = 0; i < children.length; i++) {
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
        // 一共分五类：
        // 1.component普通组件
        // 2.tag普通标签
        // 3.dynamicComponent动态组件
        // 4.text普通文本
        // 5.bindText存在动态文本
        // 其中none为未分配类型，表示需要进一步确认
        type: 'component',
        component: tagName
      };
    }

    return {
      type: 'none',
      tagName: tagName,
      attrs: newAttrs,
      children: newChildren
    };
  }
  /**
   * =========================================
   * 通过proxy的方式，对this.data中的数据进行拦截
   */


  function watcher(that) {
    var _loop = function _loop(key) {
      // 由于key的特殊性，注册前需要进行校验
      isValidKey(key);

      if (isFunction(that[key])) {
        console.error('[iCrush warn]: Data property "' + key + '" has already been defined as a Method.');
      }

      var value = that._data[key];
      that[key] = value; // 针对data进行拦截，后续对data的数据添加不会自动监听了
      // this._data的数据是初始化以后的，后续保持不变，方便组件被重新使用（可能的设计，当前预留一些余地）
      // 当前对象数据会和方法一样直接挂载在根节点

      Object.defineProperty(that, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          value = newValue; // 数据改变，触发更新

          that.$$updateComponent();
        }
      });
    };

    for (var key in that._data) {
      _loop(key);
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


  function isText(value) {
    return value !== null && _typeof(value) === 'object' && value.nodeType === 3 && !isPlainObject(value);
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
      this.__directiveTask = {};
      this.__componentTask = {};
      this.__filterTask = {}; // 挂载好了以后，启动监听

      watcher(this); // 标记已经挂载

      this.__isMounted = true;
      this.$$lifecycle('mounted');
    }; // 第一次或数据改变的时候，更新页面


    iCrush.prototype.$$updateComponent = function () {
      this.$$lifecycle('beforeUpdate');
      this.$$lifecycle('updated');
    }; // 销毁组件，释放资源


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
    var doit = function doit(node, createElement) {
      var childNodes = node.childNodes,
          childRenders = [];

      for (var i = 0; i < childNodes.length; i++) {
        // 如果是文本结点
        if (isText(childNodes[i])) {
          // 对于空格，tab等空白文字结点，我们认为可以直接剔除
          if (!/^[\x20\t]+$/.test(childNodes[i].textContent)) {
            childRenders.push(childNodes[i].textContent);
          }
        } // 如果是标签结点
        else if (isElement(childNodes[i])) {
            childRenders.push(doit(childNodes[i], createElement));
          }
      } // 记录属性


      var attrs = {};

      for (var _i = 0; _i < node.attributes.length; _i++) {
        attrs[node.attributes[_i].nodeName] = node.attributes[_i].nodeValue;
      } // 返回生成的元素


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

    this.$$lifecycle(options.beforeCreate); // 初始化对象

    this.$$init(options);
    this.$$lifecycle('created'); // 如果没有设置挂载点
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


  initMixin(iCrush); // 初始化对象

  lifecycleMixin(iCrush); // 和组件的生命周期相关调用

  renderMixin(iCrush); // 组件渲染或更新相关

  var iBind = {};
  var iOn = {};
  var iModel = {};
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
  iCrush.directive('bind', iBind);
  iCrush.directive('on', iOn);
  iCrush.directive('model', iModel);
  iCrush.component('component', component);
  iCrush.filter('number', number); // 把组件挂载到页面中去

  iCrush.prototype.$$mount = function () {
    if (!isFunction(this._options.render)) {
      var template = this.template; // 如果template没有设置或设置的不是字符串

      if (!template || !isString(template)) {
        // 直接选择el
        template = outHTML(this._el);
      } // 根据template生成render函数


      this.$$render = createRenderFactroy(template);
    } else {
      this.$$render = this._options.render;
    } // 准备好以后挂载


    this.$$mountComponent();
  }; // 根据运行环境，导出接口


  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = iCrush;
  } else {
    window.iCrush = iCrush;
  }
})();