/*!
* iCrush v0.1.0
* (c) 2007-2020 心叶 git+https://github.com/yelloxing/iCrush.git
* License: MIT
*/

(function () {
  'use strict';

  /**
   * =========================================
   * 挂载全局指令，组件等全局方法
   */
  function initGlobalAPI (iCrush) {

    iCrush.prototype.$directive = {};
    // 挂载全局指令方法
    // 指令options可配置项有：
    //    1.inserted（关联的结点插入页面触发）
    //    2.update（数据改变更新触发）
    iCrush.directive = function (name, options) {
      if (iCrush.prototype.$directive[name]) {
        throw new Error('The directive has already been defined:v-' + name);
      }
      iCrush.prototype.$directive[name] = options;
    };

    iCrush.prototype.$component = {};
    // 挂载全局组件方法
    // 组件options可配置项等情况和iCrush对象一致
    iCrush.component = function (name, options) {
      if (iCrush.prototype.$component[name]) {
        throw new Error('The component has already been defined:ui-' + name);
      }
      iCrush.prototype.$component[name] = options;
    };

    // 创建组件方法
    iCrush.prototype._new = function (options) {
      return new iCrush(options);
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
   * 比如：检查参数是否合法，标记组件，部分数据需要预处理等基本操作
   * =========================================
   * 组件初始化
   */

  let uid = 1;

  function initMixin(iCrush) {

    // 对象初始化
    iCrush.prototype._init = function (options) {

      this.$uid = uid++;
      options = options || {};

      for (let key in options) {
        // 判断是不是_或者$开头的
        // 这二个内部预留了
        if (/^[_$]/.test(key)) {
          throw new Error('The beginning of _and $is not allowed：' + key);
        }
        this[key] = options[key];
      }

      // 数据预处理
      if (isFunction(this.data)) {
        this.data = this.data();
      }

    };

  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var xhtml_min = createCommonjsModule(function (module) {
  function isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true}catch(e){return false}}function _construct(Parent,args,Class){if(isNativeReflectConstruct()){_construct=Reflect.construct;}else {_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor;if(Class)_setPrototypeOf(instance,Class.prototype);return instance};}return _construct.apply(null,arguments)}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2}}function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj};}else {_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};}return _typeof(obj)}(function(){var MAX_SAFE_INTEGER=9007199254740991;function isLength(value){return typeof value=="number"&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER}function isArrayLike(value){return value!=null&&typeof value!="function"&&isLength(value.length)}var toString=Object.prototype.toString;function getType(value){if(value==null){return value===undefined?"[object Undefined]":"[object Null]"}return toString.call(value)}function isString(value){var type=_typeof(value);return type==="string"||type==="object"&&value!=null&&!Array.isArray(value)&&getType(value)==="[object String]"}function isArraySpec(value){return isArrayLike(value)&&!isString(value)}var concat=function concat(newArray,values){for(var i=0;i<values.length;i++){if(isArraySpec(values[i])){if(values[i].length>1){concat(newArray,values[i]);}else if(values[i].length===1){newArray.push(values[i][0]);}}else {newArray.push(values[i]);}}};function concat$1(){var newArray=[];for(var _len=arguments.length,values=new Array(_len),_key=0;_key<_len;_key++){values[_key]=arguments[_key];}concat(newArray,values);return newArray}function isPlainObject(value){if(value===null||_typeof(value)!=="object"||getType(value)!="[object Object]"){return false}if(Object.getPrototypeOf(value)===null){return true}var proto=value;while(Object.getPrototypeOf(proto)!==null){proto=Object.getPrototypeOf(proto);}return Object.getPrototypeOf(value)===proto}function isElement(value){return value!==null&&_typeof(value)==="object"&&(value.nodeType===1||value.nodeType===9||value.nodeType===11)&&!isPlainObject(value)}function isObject(value){var type=_typeof(value);return value!=null&&(type==="object"||type==="function")}var xhtml=function xhtml(){for(var _len2=arguments.length,nodes=new Array(_len2),_key2=0;_key2<_len2;_key2++){nodes[_key2]=arguments[_key2];}return new xhtml.prototype.init(nodes)};xhtml.prototype.init=function(nodes){nodes=concat$1.apply(void 0,_toConsumableArray(nodes));this.length=0;for(var i=0;i<nodes.length;i++){if(isElement(nodes[i])){this[this.length]=nodes[i];this.length+=1;}}return this};xhtml.prototype.extend=xhtml.extend=function(){var target=arguments[0]||{};var source=arguments[1]||{};var length=arguments.length;if(length===1){source=target;target=this;}if(!isObject(target)){target={};}for(var key in source){try{target[key]=source[key];}catch(e){throw new Error("Illegal property value！")}}return target};xhtml.prototype.init.prototype=xhtml.prototype;var toNode=function toNode(template){var frame=document.createElement("div");frame.innerHTML=template;var childNodes=frame.childNodes;for(var i=0;i<childNodes.length;i++){if(isElement(childNodes[i])){return childNodes[i]}}return null};function toNode$1(template){if(isElement(template)){return template}else if(isString(template)){return toNode(template)}else {throw new Error("Illegal template!")}}function isFunction(value){if(!isObject(value)){return false}var type=getType(value);return type==="[object Function]"||type==="[object AsyncFunction]"||type==="[object GeneratorFunction]"||type==="[object Proxy]"}function append(node){if(this.length>0){this[0].appendChild(toNode$1(node));}return this}function prepend(node){if(this.length>0){this[0].insertBefore(toNode$1(node),this[0].childNodes[0]);}return this}function after(node){if(this.length>0){this[0].parentNode.insertBefore(toNode$1(node),this[0].nextSibling);}return this}function before(node){if(this.length>0){this[0].parentNode.insertBefore(toNode$1(node),this[0]);}return this}function find(tagName,checkback){if(isFunction(tagName)||arguments.length<1){checkback=tagName;tagName="*";}var nodes=this[0].getElementsByTagName(tagName);if(!isFunction(checkback)){return this["new"](nodes)}var xhtmlObj=this["new"]();for(var i=0;i<nodes.length;i++){if(checkback(nodes[i])){xhtmlObj[xhtmlObj.length++]=nodes[i];}}return xhtmlObj}function parents(checkback,stopback){var nodes=[],node=this[0].parentNode;while(isElement(node)){if(!isFunction(checkback)||checkback(node)){nodes.push(node);}if(isFunction(stopback)&&stopback(node)){break}node=node.parentNode;}return this["new"](nodes)}function children(checkback){var nodes=this[0].childNodes,xhtmlObj=this["new"]();for(var i=0;i<nodes.length;i++){if(isElement(nodes[i])&&(!isFunction(checkback)||checkback(nodes[i]))){xhtmlObj[xhtmlObj.length++]=nodes[i];}}return xhtmlObj}function eq(index){var xhtmlObj=this["new"]();if(this.length>index){xhtmlObj[0]=this[index];xhtmlObj.length=1;}return xhtmlObj}function remove(){for(var i=0;i<this.length;i++){this[i].parentNode.removeChild(this[i]);}return this}var classHelper={has:function has(targetClass,checkClass){targetClass=" "+targetClass+" ";checkClass=" "+checkClass.trim()+" ";return targetClass.indexOf(checkClass)>-1},delete:function _delete(targetClass,checkClass){targetClass=" "+targetClass+" ";checkClass=" "+checkClass.trim()+" ";while(targetClass.indexOf(checkClass)>-1){targetClass=targetClass.replace(checkClass," ");}return targetClass.trim().replace(/ +/g," ")}};function attr(attr,val){if(arguments.length<2){return this.length>0?this[0].getAttribute(attr):undefined}for(var i=0;i<this.length;i++){this[i].setAttribute(attr,val);}return this}function hasClass(clazz){var oldClazz=this[0].getAttribute("class");return classHelper.has(oldClazz,clazz)}function removeClass(clazz){var oldClazz=this[0].getAttribute("class");var newClazz=classHelper["delete"](oldClazz,clazz);this[0].setAttribute("class",newClazz);return this}function addClass(clazz){var oldClazz=this[0].getAttribute("class");if(!classHelper.has(oldClazz,clazz)){this[0].setAttribute("class",oldClazz+" "+clazz);}return this}function toggerClass(clazz){var oldClazz=this[0].getAttribute("class");if(classHelper.has(oldClazz,clazz)){var newClazz=classHelper["delete"](oldClazz,clazz);this[0].setAttribute("class",newClazz);}else {this[0].setAttribute("class",oldClazz+" "+clazz);}return this}function getStyle(dom,name){var allStyle=document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(dom,null):dom.currentStyle;return typeof name==="string"?allStyle.getPropertyValue(name):allStyle}function css(){if(arguments.length<=1&&(arguments.length<=0||_typeof(arguments[0])!=="object")){if(this.length<=0)return;return getStyle(this[0],arguments[0])}for(var i=0;i<this.length;i++){if(arguments.length===1){for(var key in arguments[0]){this[i].style[key]=arguments[0][key];}}else this[i].style[arguments[0]]=arguments[1];}return this}function stopPropagation(event){event=event||window.event;if(event.stopPropagation){event.stopPropagation();}else {event.cancelBubble=true;}}function preventDefault(event){event=event||window.event;if(event.preventDefault){event.preventDefault();}else {event.returnValue=false;}}function bind(eventType,callback){if(window.attachEvent){for(var i=0;i<this.length;i++){this[i].attachEvent("on"+eventType,callback);}}else {for(var _i=0;_i<this.length;_i++){this[_i].addEventListener(eventType,callback,false);}}return this}function unbind(eventType,handler){if(window.detachEvent){for(var i=0;i<this.length;i++){this[i].detachEvent("on"+eventType,handler);}}else {for(var _i2=0;_i2<this.length;_i2++){this[_i2].removeEventListener(eventType,handler,false);}}return this}function trigger(eventType){var i,event;if(document.createEventObject){event=document.createEventObject();for(i=0;i<this.length;i++){this[i].fireEvent("on"+eventType,event);}}else {event=document.createEvent("HTMLEvents");event.initEvent(eventType,true,false);for(i=0;i<this.length;i++){this[i].dispatchEvent(event);}}return this}function size(type){var dom=this[0],elemHeight,elemWidth;if(type=="content"){elemWidth=dom.clientWidth-(getStyle(dom,"padding-left")+"").replace("px","")-(getStyle(dom,"padding-right")+"").replace("px","");elemHeight=dom.clientHeight-(getStyle(dom,"padding-top")+"").replace("px","")-(getStyle(dom,"padding-bottom")+"").replace("px","");}else if(type=="padding"){elemWidth=dom.clientWidth;elemHeight=dom.clientHeight;}else if(type=="border"){elemWidth=dom.offsetWidth;elemHeight=dom.offsetHeight;}else if(type=="scroll"){elemWidth=dom.scrollWidth;elemHeight=dom.scrollHeight;}else {elemWidth=dom.offsetWidth;elemHeight=dom.offsetHeight;}return {width:elemWidth,height:elemHeight}}function mousePosition(event){var bounding=this[0].getBoundingClientRect();if(!event||!event.clientX)throw new Error("Event is necessary!");return {x:event.clientX-bounding.left,y:event.clientY-bounding.top}}function offsetPosition(){var left=0,top=0,dom=this[0];top=dom.offsetTop;left=dom.offsetLeft;dom=dom.offsetParent;while(dom){top+=dom.offsetTop;left+=dom.offsetLeft;dom=dom.offsetParent;}return {left:left,top:top}}xhtml.prototype.extend({append:append,prepend:prepend,after:after,before:before,find:find,parents:parents,children:children,eq:eq,remove:remove,attr:attr,css:css,hasClass:hasClass,addClass:addClass,removeClass:removeClass,toggerClass:toggerClass,bind:bind,unbind:unbind,trigger:trigger,size:size,mousePosition:mousePosition,offsetPosition:offsetPosition});xhtml.extend({stopPropagation:stopPropagation,preventDefault:preventDefault});xhtml.prototype["new"]=function(){for(var _len3=arguments.length,nodes=new Array(_len3),_key3=0;_key3<_len3;_key3++){nodes[_key3]=arguments[_key3];}return _construct(xhtml,nodes)};if((_typeof(module))==="object"&&_typeof(module.exports)==="object"){module.exports=xhtml;}else {var _xhtml=window.xhtml;xhtml.noConflict=function(deep){window.xhtml=_xhtml;return xhtml};window.xhtml=xhtml;}})();
  });

  /**
   * =========================================
   * 事件相关的处理
   */

  function eventsMixin(iCrush) {

    // 具体的绑定@event事件的方法
    iCrush.prototype._bind = function (el, type, callbackTemplate) {
      let _this = this;

      // 方法名称
      let callback_name = callbackTemplate.replace(/\([^)]{0,}\)/, '');
      let callback_params = callbackTemplate.replace(/[^(]{1,}\({0,1}([^)]{0,})\){0,1}/, "$1").split(',');

      // 绑定
      xhtml_min(el).bind(type, function () {

        // 执行方法
        // 目前不支持传递变量
        _this.methods[callback_name].apply(_this, callback_params);
      });
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
    iCrush.prototype._lifecycle = function (callbackName) {

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

      ].indexOf(callbackName) > -1 && isFunction(this[callbackName])) {
        this[callbackName].call(this);
      }

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
   * 备注：未来这里可能会修改成虚拟结点，进行优化
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

    const node = document.createElement(tagName);

    let directive = [], event = [], textBind = [], component = [], dynamicComponent = [];

    if (/ui\-/.test(tagName.toLowerCase())) {
      // 如果是一个组件
      // 子结点失去意义
      return {
        el: node,
        tagName: tagName.toLowerCase(),
        attrs,
        directive: [],
        textBind: [],
        event: [],
        component: [],
        dynamicComponent: []
      };
    }

    // 如果是动态组件
    // 特别标记一下
    else if (tagName.toLowerCase() == 'component') {

      // 如果是动态组件，孩子结点直接无视
      children = [];

      // 组件动态组件
      dynamicComponent.push({
        el: node
      });
    }

    attrs = attrs || {};
    for (let key in attrs) {

      // 指令
      if (/^v-/.test(key)) {
        directive.push({
          el: node,
          name: key.replace('v-', ''),
          value: attrs[key]
        });
      }

      // 结点事件
      else if (/^@/.test(key)) {
        event.push({
          el: node,
          name: key,
          value: attrs[key]
        });
      }

      // 普通属性
      else {
        node.setAttribute(key, attrs[key]);
      }

    }

    // 迭代子孩子
    children = children || [];
    for (let i = 0; i < children.length; i++) {
      let childNode = children[i];

      // 如果是字符串，需要变成结点
      if (isString(childNode)) {
        let text = childNode;

        childNode = {
          el: document.createTextNode(text),
          text
        };

        // 特殊的文本结点
        // 如果不包含{{}}这样的，不需要记录
        if (/{{[^}]+}}/.test(text)) {
          textBind.push(childNode);
        }


      } else {

        // 合并指令
        for (let i = 0; i < childNode.directive.length; i++) {
          directive.push(childNode.directive[i]);
        }

        // 合并事件
        for (let i = 0; i < childNode.event.length; i++) {
          event.push(childNode.event[i]);
        }

        // 合并组件
        for (let i = 0; i < childNode.component.length; i++) {
          component.push(childNode.component[i]);
        }

        // 合并动态组件
        for (let i = 0; i < childNode.dynamicComponent.length; i++) {
          dynamicComponent.push(childNode.dynamicComponent[i]);
        }

        // 合并文本结点
        for (let i = 0; i < childNode.textBind.length; i++) {
          textBind.push(childNode.textBind[i]);
        }

      }

      if (childNode.tagName) {
        component.push(childNode);
      }

      // 追加
      node.appendChild(childNode.el);
    }

    return {
      el: node,
      directive,
      textBind,
      event,
      component,
      dynamicComponent
    };

  }

  /**
   * =========================================
   * 通过proxy的方式，对this.data中的数据进行拦截
   */

  function watcher (_this) {

    for (let key in _this.data) {
      let value = get(_this.data, key);

      // 针对data进行拦截，后续对data的数据添加不会自动监听了
      Object.defineProperty(_this.data, key, {
        get() {
          return value;
        },
        set(newValue) {
          _this._lifecycle('beforeUpdate');

          value = newValue;

          // 数据改变，触发更新
          _this._updateComponent();

          _this._lifecycle('updated');
        }
      });
    }

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

  /**
   * =========================================
   * 所有和视图渲染相关的处理都在这里
   */

  // 更新{{}}的值
  let refurbishTextBind = function (_this, textBinds) {
    for (let i = 0; i < textBinds.length; i++) {

      // 解析{{message}}这样的值
      // 目前只支持这种单一的方式
      let text = textBinds[i].text.replace(/{{[^}]+}}/g, oldValue => {
        let value = get(_this, oldValue.replace('{{', '').replace('}}', ""));
        return value;
      });

      // 替换文本结点
      let newEl = document.createTextNode(text);
      textBinds[i].el.parentNode.replaceChild(newEl, textBinds[i].el);
      textBinds[i].el = newEl;
    }
  };

  // 触发指令中指定的生命周期钩子
  let renderDirective = function (_this, directives, hookName) {
    for (let i = 0; i < directives.length; i++) {
      let directiveE = directives[i];
      let names = (directiveE.name + ":").split(':');
      let directive = _this.$directive[names[0]];

      // 如果指令没有注册
      if (!directive) {
        throw new Error('The directive is not registered:v-' + directiveE.name);
      }

      // 调用对应的生命周期钩子
      if (isFunction(directive[hookName])) {
        directive[hookName].call(
          directive,
          directiveE.el,
          {
            value: get(_this, directiveE.value),
            arg: directiveE.value,
            type: names[1],
            target: _this
          }
        );
      }
    }
  };

  // 挂载和更新动态组件
  let refurbishDynamicComponent = function (_this, dynamicComponents, isBind) {
    for (let i = 0; i < dynamicComponents.length; i++) {
      let dynamicComponent = dynamicComponents[i];

      // 如果不是第一次，而且值没有改变
      if (!isBind && dynamicComponent.el._dynamic_component_ == dynamicComponent.el.getAttribute('is')) {
        continue;
      } else {
        // 如果是第一次，或is改变了
        dynamicComponent.el._dynamic_component_ = dynamicComponent.el.getAttribute('is');
      }

      // 重新挂载组件
      // 销毁前后钩子没有调用
      dynamicComponent.el.innerHTML = '<i></i>';
      let targetEl = dynamicComponent.el.firstElementChild;

      let options = _this.$component[dynamicComponent.el._dynamic_component_];
      options.el = targetEl;
      _this._new(options);

    }
  };

  function renderMixin(iCrush) {

    // 根据render生成dom挂载到挂载点
    // 并调用watcher启动数据监听
    // 并调用events方法开启@事件注册
    // 并记录其中的组件，指令和{{}}等
    iCrush.prototype._mountComponent = function (el) {

      // 获取虚拟结点
      const vnode = this.render(createElement);

      // 挂载真实结点到页面
      let newEl = vnode.el;
      this.el.parentNode.replaceChild(newEl, this.el);
      this.el = newEl;

      // 挂载好指令等需要update的时候维护的数据
      this.$directiveE = vnode.directive;
      this.$textBindE = vnode.textBind;
      this.$dynamicComponent = vnode.dynamicComponent;

      // 第一次主动更新{{}}的值
      refurbishTextBind(this, this.$textBindE);

      // 指令inserted
      renderDirective(this, this.$directiveE, 'inserted');

      // 第一次初始化动态组件
      refurbishDynamicComponent(this, this.$dynamicComponent, true);

      // 启动数据监听
      watcher(this);

      // 绑定事件
      for (let i = 0; i < vnode.event.length; i++) {
        this._bind(vnode.event[i].el, vnode.event[i].name.replace(/^@/, ''), vnode.event[i].value);
      }

      // 如果最外层就是组件
      if (vnode.tagName && /^ui\-/.test(vnode.tagName)) {
        vnode.component = [{
          el: vnode.el,
          tagName: vnode.tagName,
          attrs: vnode.attrs
        }];
      }

      // 建立子组件
      for (let i = 0; i < vnode.component.length; i++) {

        // 获取我们注册的组件
        let component = this.$component[vnode.component[i].tagName.replace(/^ui\-/, "")];

        // 如果组件未定义
        if (!component) {
          throw new Error('The component is not registered:' + vnode.component[i].tagName);
        }

        // 设置挂载点
        component.el = vnode.component[i].el;

        // 设置props
        if (Array.isArray(component.props)) {
          let props = {};
          for (let i = 0; i < component.props.length; i++) {
            set(props, component.props[i], get(vnode.component[i].attrs, component.props[i]));
          }
          component.props = props;
        }

        let newThis = this._new(component);

        // 通过$pid把组件之间的父子关系挂起来，方便后期数据传递
        newThis.$pid = this.$uid;
      }

    };

    // 第一次或数据改变的时候，更新页面
    iCrush.prototype._updateComponent = function () {


      // 更新{{}}的值
      refurbishTextBind(this, this.$textBindE);

      // 指令update
      renderDirective(this, this.$directiveE, 'update');

      // 更新动态组件
      refurbishDynamicComponent(this, this.$dynamicComponent);

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

    this._lifecycle(options.beforeCreate);

    // 初始化对象
    this._init(options);

    this._lifecycle('created');

    // 如果没有设置挂载点
    // 表示该组件不挂载
    // 不挂载的话，render或template也不会去解析
    // 或许可以在一定阶段以后，在主动去挂载，这样有益于提高效率
    if (isElement(this.el)) {
      this._lifecycle('beforeMount');

      // 挂载组件到页面
      this._mount(this.el);

      this._lifecycle('mounted');
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
   * v-bind="express"
   */

  let update = function (el, binding) {

    if (binding.value && !isString(binding.value)) {
      binding.value = JSON.stringify(binding.value);
    }

    // 默认或者value类型，表示赋值
    if (binding.type == '' || binding.type == 'value') {
      el.value = el.textContent = binding.value;
    }

    // 负责设置属性
    else {
      el.setAttribute(binding.type, binding.value);
    }

  };

  var vBind = {
    inserted: update,
    update
  };

  /**
   * 用于数据双向绑定
   * =========================================
   * v-model="express"
   */

  var vModel = {
    inserted: function (el, binding) {
      el.value = binding.value;
      xhtml_min(el).bind('input', () => {
        set(binding.target, binding.arg, el.value);
      });
    },
    update: function (el, binding) {
      el.value = binding.value;
    }
  };

  /**
   * 备注：除非特殊情况，_开头的表示内置方法，$开头的表示内置资源
   * =========================================
   * 整合全部资源，对外暴露调用接口
   */

  // 挂载全局方法
  initGlobalAPI(iCrush);

  // 挂载内置指令
  iCrush.directive("bind", vBind); // v-bind单向绑定
  iCrush.directive("model", vModel); // v-model双向绑定

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

}());
