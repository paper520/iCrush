!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=(a=i,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),r=i.sources.map((function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"}));return[n].concat(r).concat([o]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];null!=r&&(i[r]=!0)}for(o=0;o<e.length;o++){var a=e[o];null!=a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){"use strict";function i(e,t,n){var i,o=document.createElement("style"),r=document.head||document.getElementsByTagName("head")[0],a="";for(i=0;i<t.length;i++)a+="\n/* "+t[i][0]+" */\n",a+=t[i][1]+"\n\n";n&&(a=(a=a.replace(/( {0,}){/g,"["+e+"]{")).replace(/( {0,}),/g,"["+e+"],")),o.innerHTML=a,o.type="text/css",r.appendChild(o)}n.r(t),n.d(t,"default",(function(){return i}))},function(module,exports,__webpack_require__){"use strict";(function(module){function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach((function(t){_defineProperty(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
/*!
* iCrush v2.0.0
* (c) 2019-2020 心叶 git+https://github.com/yelloxing/iCrush.git
* License: MIT
*/!function(){function mount(e){e.directive=function(t,n){e.prototype.__directiveLib[t]=n},e.component=function(t,n){e.prototype.__componentLib[t]=n}}function use(e){e.use=function(t){t.install.call(t,e)}}function initGlobalAPI(e){e.prototype.__directiveLib={},e.prototype.__componentLib={},mount(e),use(e)}var toString=Object.prototype.toString;function getType(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":toString.call(e)}function isObject(e){var t=_typeof(e);return null!=e&&("object"===t||"function"===t)}function isFunction(e){if(!isObject(e))return!1;var t=getType(e);return"[object Function]"===t||"[object AsyncFunction]"===t||"[object GeneratorFunction]"===t||"[object Proxy]"===t}function isString(e){var t=_typeof(e);return"string"===t||"object"===t&&null!=e&&!Array.isArray(e)&&"[object String]"===getType(e)}function isPlainObject(e){if(null===e||"object"!==_typeof(e)||"[object Object]"!=getType(e))return!1;if(null===Object.getPrototypeOf(e))return!0;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function isElement(e){return null!==e&&"object"===_typeof(e)&&(1===e.nodeType||9===e.nodeType||11===e.nodeType)&&!isPlainObject(e)}function outHTML(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}function toNode(e){if(isElement(e))return e;var t=document.createElement("div");return t.innerHTML=e.replace(/[\n\f\r]/g,"").trim(),t.firstElementChild}function isValidKey(e){/^[_$]/.test(e)&&console.error("[iCrush warn]: The beginning of _ or $ is not allowed："+e)}function compilerText(target,text){var getText=function getText(str){return eval(str)};return getText.call(target,text)}function templateToName(e){for(var t=(e+"").toLowerCase(),n=(e+"").toUpperCase(),i="",o=!1,r=0;r<e.length;r++)"-"!=e[r]?o?(i+=n[r],o=!1):i+=t[r]:o=!0;return i}function replaceDom(e,t){e.parentNode.replaceChild(t,e)}function bindEvent(e,t,n){window.attachEvent?e.attachEvent("on"+t,n):e.addEventListener(t,n,!1)}function unbindEvent(e,t,n){window.detachEvent?e.detachEvent("on"+t,n):e.removeEventListener(t,n,!1)}function stopPropagation(e){(e=e||window.event).stopPropagation?e.stopPropagation():e.cancelBubble=!0}function preventDefault(e){(e=e||window.event).preventDefault?e.preventDefault():e.returnValue=!1}var uid=1;function initMixin(e){e.prototype.$$init=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};for(var t in this._options=e,this._uid=uid++,this._data=isFunction(e.data)?e.data():e.data,this._el=isString(e.el)?document.querySelector(e.el):e.el,this.__isMounted=!1,this.__isDestroyed=!1,e.methods)isValidKey(t),this[t]=e.methods[t];for(var n in this._data)this[n]=this._data[n];for(var i in this.__componentLib_scope={},e.component)this.__componentLib_scope[i]=e.component[i];for(var o in this.__directiveLib_scope={},e.directive)this.__directiveLib_scope[o]=e.directive[o]}}function lifecycleMixin(e){e.prototype.$$lifecycle=function(e){isFunction(e)?e():["created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed"].indexOf(e)>-1&&isFunction(this._options[e])&&this._options[e].call(this)}}function createElement(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i={},o=[];if(!isString(e))return{type:"component",options:e,attrs:{},children:[]};for(var r in t)/^@/.test(r)?i[r.replace(/^@/,"i-on:")]=t[r]:/^:/.test(r)?i["i-bind"+r]=t[r]:i[r]=t[r];for(var a,c=0;c<n.length;c++)isString(a=n[c])?/\{\{[^}]+\}\}/.test(a)?o.push({type:"bindText",content:('" '+a+' "').replace(/\{\{([^}]+)\}\}/g,'"+this.$1+"')}):o.push({type:"text",content:a}):o.push(a);return{type:"none",tagName:e,attrs:i,children:o}}function isSymbol(e){var t=_typeof(e);return"symbol"===t||"object"===t&&null!==e&&"[object Symbol]"===getType(e)}function isKey(e,t){if(Array.isArray(e))return!1;var n=_typeof(e);return!("number"!=n&&"boolean"!=n&&null!=e&&!isSymbol(e))||null!==t&&e in Object(t)||/^\w*$/.test(e)}function stringToPath(e){return e.replace(/\[/g,".").replace(/\]/g,"").replace(/"/g,"").replace(/'/g,"").split(".")}function castPath(e,t){return Array.isArray(e)?e:isKey(e,t)?[e]:stringToPath(e)}var INFINITY=1/0;function toKey(e){if("string"==typeof e||isSymbol(e))return e;var t="".concat(e);return"0"===t&&1/e==-INFINITY?"-0":t}function baseGet(e,t){t=castPath(t,e);for(var n=0;n<t.length&&null!==e;n++)e=e[toKey(t[n])];return n&&n===t.length?e:void 0}function get(e,t,n){var i=null==e?void 0:baseGet(e,t);return void 0===i?n:i}function mountDom(e,t,n,i){var o,r=get(e,t);if(r){if("none"==r.type){var a=templateToName(r.tagName);e.__componentLib[a]||e.__componentLib_scope[a]?(r.options=e.__componentLib[a]||e.__componentLib_scope[a],r.type="component"):r.type="tag"}if("component"==r.type){o=document.createElement("i-crush-component"),n.appendChild(o),r.options.el=o,r.instance=new i(r.options),r.instance.__parent=e;var c={};for(var s in r.attrs)/^data-icrush-/.test(s)||(/^:/.test(s)?c[s.replace("i-bind"+s)]=r.attrs[s]:/^@/.test(s)?c[s.replace(s.replace(/^@/,"i-on:"))]=r.attrs[s]:c[s]=r.attrs[s]);var u={attrs:c,instance:r.instance};if("component"==u.instance._name){var l=u.attrs["i-bind:is"];u.instance.lister(i,e[l])}e.__componentTask.push(u)}else if("tag"==r.type){for(var p in o=document.createElement(r.tagName),"I-CRUSH-COMPONENT"==n.nodeName||"I-CRUSH-COMPONENT"==n._nodeName?(replaceDom(n,o),e._el=o):n.appendChild(o),r.attrs){var d=r.attrs[p],f=(p+":").split(":"),h=e.__directiveLib[templateToName(f[0])]||e.__directiveLib_scope[templateToName(f[0])];h?e.__directiveTask.push(_objectSpread({el:o},h,{value:d,type:f[1]})):o.setAttribute(p,d)}for(var b=0;b<r.children.length;b++)mountDom(e,t+".children["+b+"]",o,i)}else"text"==r.type?((o=document.createTextNode("")).textContent=r.content.replace(/↵/g,"\n"),n.appendChild(o)):"bindText"==r.type?((o=document.createTextNode("")).textContent=compilerText(e,r.content).replace(/↵/g,"\n"),n.appendChild(o),e.__bindTextTask.push({el:o,content:r.content})):console.error("[iCrush warn]: Type not expected："+r.type)}else console.error("[iCrush warn]: vnode is undefined!")}function watcher(e){var t=function(t){isValidKey(t),isFunction(e[t])&&console.error('[iCrush warn]: Data property "'+t+'" has already been defined as a Method.');var n=e._data[t];e[t]=n,Object.defineProperty(e,t,{get:function(){return n},set:function(t){n=t,e.$$updateComponent()}})};for(var n in e._data)t(n)}function isText(e){return null!==e&&"object"===_typeof(e)&&3===e.nodeType&&!isPlainObject(e)}function renderMixin(e){e.prototype.$$mountComponent=function(){this.$$lifecycle("beforeMount"),this._vnode=this.$$render(createElement),this.__directiveTask=[],this.__componentTask=[],this.__bindTextTask=[],mountDom(this,"_vnode",this._el,e);for(var t=0;t<this.__directiveTask.length;t++){var n=this.__directiveTask[t];isFunction(n.inserted)&&n.inserted(n.el,{target:this,exp:n.value,value:get(this,n.value),type:n.type})}watcher(this),this.__isMounted=!0,this.$$lifecycle("mounted")},e.prototype.$$updateComponent=function(){this.$$lifecycle("beforeUpdate");for(var t=0;t<this.__directiveTask.length;t++){var n=this.__directiveTask[t];isFunction(n.update)&&n.update(n.el,{target:this,exp:n.value,value:get(this,n.value),type:n.type})}for(var i=0;i<this.__bindTextTask.length;i++){var o=this.__bindTextTask[i],r=compilerText(this,o.content).replace(/↵/g,"\n");o.el.textContent!=r&&(o.el.textContent=r)}for(var a=0;a<this.__componentTask.length;a++){var c=this.__componentTask[a];if("component"==c.instance._name){var s=c.attrs["i-bind:is"];c.instance.lister(e,this[s])}}this.$$lifecycle("updated")},e.prototype.$$destroyComponent=function(){this.$$lifecycle("beforeDestroy");for(var e=0;e<this.__directiveTask.length;e++){var t=this.__directiveTask[e];isFunction(t.delete)&&t.delete(t.el,{target:this,exp:t.value,value:get(this,t.value),type:t.type})}this.$$lifecycle("destroyed")}}function createRenderFactroy(e){return function(t){return function e(t,n){for(var i=t.childNodes,o=[],r=0;r<i.length;r++)isText(i[r])?/^[\x20\t]+$/.test(i[r].textContent)||o.push(i[r].textContent):isElement(i[r])&&o.push(e(i[r],n));for(var a={},c=0;c<t.attributes.length;c++)a[t.attributes[c].nodeName]=t.attributes[c].nodeValue;return n(t.tagName,a,o)}(toNode(e),t)}}function iCrush(e){this instanceof iCrush||console.error("[iCrush warn]: iCrush is a constructor and should be called with the `new` keyword");var t=e.name||"noname";this._name=t,this.$$lifecycle(e.beforeCreate),this.$$init(e),this.$$lifecycle("created"),isElement(this._el)&&this.$$mount()}initMixin(iCrush),lifecycleMixin(iCrush),renderMixin(iCrush);var update=function(e,t){isString(t.type)&&t.type.length>0?e.getAttribute(t.type)!=t.value&&e.setAttribute(t.type,t.value):e.value==t.value&&e.textContent==t.value||(e.value=e.textContent=t.value)},iBind={inserted:update,update:update},iOn={inserted:function(e,t){for(var n=t.type.split("."),i={prevent:!1,stop:!1,once:!1},o=1;o<n.length;o++)i[n[o]]=!0;bindEvent(e,n[0],(function o(r){i.stop&&stopPropagation(r),i.prevent&&preventDefault(r);var a=/^([^(]+)(\([^)]{0,}\)){0,1}/.exec(t.exp),c=[],s=[];if(a[2]){var u=a[2].replace(/^\(/,"").replace(/\)$/,"").trim();u.length>0&&(s=u.split(","))}for(var l=0;l<s.length;l++){var p=s[l];p=/^\d/.test(p)||"true"==p||"false"==p||"NAN"==p||/["']/.test(p)?compilerText(t.target,p):compilerText(t.target,"this."+p),c.push(p)}t.target[a[1]].apply(t.target,c),i.once&&unbindEvent(e,n[0],o)}))}};function baseAssignValue(e,t,n){"__proto__"==t?Object.defineProperty(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}function assignValue(e,t,n){baseAssignValue(e,t,n)}function baseSet(e,t,n,i){if(!isObject(e))return e;t=castPath(t,e);for(var o=e,r=0;r<t.length;r++){var a=toKey(t[r]),c=n;if(r+1!=t.length){var s=o[a];isObject(s)?c=s:void 0===(c=i?i(s,a,o):void 0)&&(c={})}assignValue(o,a,c),o=o[a]}return e}function set(e,t,n,i){return i="function"==typeof i?i:void 0,null==e?e:baseSet(e,t,n,i)}var iModel={inserted:function(e,t){e.value=t.value,bindEvent(e,"input",(function(){set(t.target,t.exp,e.value)}))},update:function(e,t){e.value=t.value}},component={name:"component",data:function(){return{is:null}},methods:{lister:function(e,t){if(t!=this.is&&null!=t){var n=this._oldComponent;n&&n.$$lifecycle("beforeDestroy"),this.is=t;var i=t;i.el=this._el,i.el._nodeName="I-CRUSH-COMPONENT",this._oldComponent=new e(i),this._el=this._oldComponent._el,n&&(n.$$lifecycle("destroyed"),n=null)}}}};initGlobalAPI(iCrush),iCrush.directive("iBind",iBind),iCrush.directive("iOn",iOn),iCrush.directive("iModel",iModel),iCrush.component("component",component),iCrush.prototype.$$mount=function(){if(isFunction(this._options.render))this.$$render=this._options.render;else{var e=this._options.template;e&&isString(e)||(e=outHTML(this._el),this._el._nodeName="I-CRUSH-COMPONENT"),this.$$render=createRenderFactroy(e)}this.$$mountComponent()},"object"===_typeof(module)&&"object"===_typeof(module.exports)?module.exports=iCrush:window.iCrush=iCrush}()}).call(this,__webpack_require__(4)(module))},function(e,t,n){e.exports=n(11)},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,n){var i=n(6);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,n(1).default)("data-icrush-3f97037a",i,!1)},function(e,t,n){(e.exports=n(0)(!1)).push([e.i,"/*!\r\n* 统一不同浏览器的基础样式\r\n* git+https://github.com/yelloxing/normalize.css.git\r\n*\r\n* @since v0.1.0 \r\n* @public\r\n* \r\n* 引入方式：\r\n* import '@yelloxing/normalize.css';\r\n*/html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;line-height:1.15}button,input{border:1px solid #b2b2bd}article,footer,header,nav,section{display:block}canvas,svg{display:inline-block}*{box-sizing:border-box}::-ms-clear,::-ms-reveal{display:none}img{display:inline-block}html{font-family:sans-serif}a{text-decoration:none}li{list-style-type:none}ul,ol,li,p,h1,h2,h3,h4,h5,h6{-webkit-margin-before:0;-webkit-margin-after:0;-webkit-padding-start:0;margin-block-end:0;margin-block-start:0;padding-inline-start:0;padding:0;margin:0}body{margin:0}table{border-collapse:collapse}\n",""])},function(e,t,n){var i=n(8);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,n(1).default)("data-icrush-74dd9b03",i,!1)},function(e,t,n){(e.exports=n(0)(!1)).push([e.i,"html{font-size:100px}body{font-size:.16rem}\n",""])},function(e,t,n){var i=n(10);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,n(1).default)("data-icrush-d5cf9266",i,!0)},function(e,t,n){(e.exports=n(0)(!1)).push([e.i,"div{color:blue;font-weight:800;font-size:40px}div>button,div>span{background-color:red}\n",""])},function(e,t,n){"use strict";n.r(t);var i=n(2),o=n.n(i),r=(n(5),n(7),{data:function(){return{info:"webpack 例子"}},methods:{show:function(){alert("这是一个"+this.info)}}});n(9);r.render=function(e){return e("div",{"data-icrush-d5cf9266":""},["↵↵    {{info}}↵↵    ",e("button",{"@click":"show","data-icrush-d5cf9266":""},["点击查看"]),e("span",{"data-icrush-d5cf9266":""},["↵↵      span:{{info}}↵↵    "])])};var a=r;window.icrush=new o.a({el:document.getElementById("root"),render:function(e){return e(a)}})}]);