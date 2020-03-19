!function(n){var t={};function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(r,o,function(t){return n[t]}.bind(null,o));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=3)}([function(n,t,e){"use strict";(function(n){function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}
/*!
* iCrush v1.0.0-alpha
* (c) 2007-2020 心叶 git+https://github.com/yelloxing/iCrush.git
* License: MIT
*/!function(){var e=Object.prototype.toString;function r(n){return null==n?void 0===n?"[object Undefined]":"[object Null]":e.call(n)}function o(n){if(!function(n){var e=t(n);return null!=n&&("object"===e||"function"===e)}(n))return!1;var e=r(n);return"[object Function]"===e||"[object AsyncFunction]"===e||"[object GeneratorFunction]"===e||"[object Proxy]"===e}function i(n){var e=t(n);return"string"===e||"object"===e&&null!=n&&!Array.isArray(n)&&"[object String]"===r(n)}function s(n){if(null===n||"object"!==t(n)||"[object Object]"!=r(n))return!1;if(null===Object.getPrototypeOf(n))return!0;for(var e=n;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(n)===e}function c(n){return null!==n&&"object"===t(n)&&(1===n.nodeType||9===n.nodeType||11===n.nodeType)&&!s(n)}function a(n){/^[_$]/.test(n)&&console.error("[iCrush warn]: The beginning of _ or $ is not allowed："+n)}var u=1;function l(n,t,e){return console.log(n,t,e),{tagName:n,attrs:t,children:e}}function f(n){return function(e){return function n(e,r){for(var o,i=e.childNodes,a=[],u=0;u<i.length;u++)null===(o=i[u])||"object"!==t(o)||3!==o.nodeType||s(o)?c(i[u])&&a.push(n(i[u],r)):/^[\x20\t]+$/.test(i[u].textContent)||a.push(i[u].textContent);for(var l={},f=0;f<e.attributes.length;f++)l[e.attributes[f].nodeName]=e.attributes[f].nodeValue;return r(e.tagName,l,a)}(function(n){if(c(n))return n;var t=document.createElement("div");return t.innerHTML=n.replace(/[\n\f\r]/g,"").trim(),t.firstElementChild}(n),e)}}function d(n){this instanceof d||console.error("[iCrush warn]: iCrush is a constructor and should be called with the `new` keyword"),this.$$lifecycle(n.beforeCreate),this.$$init(n),this.$$lifecycle("created"),c(this._el)&&this.$$mount()}!function(n){n.prototype.$$init=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};for(var t in this._options=n,this._uid=u++,this._data=o(n.data)?n.data():n.data,this._el=i(n.el)?document.querySelector(n.el):n.el,this.__isMounted=!1,this.__isDestroyed=!1,n.methods)a(t),this[t]=n.methods[t]}}(d),function(n){n.prototype.$$lifecycle=function(n){o(n)?n():["created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed"].indexOf(n)>-1&&o(this._options[n])&&this._options[n].call(this)}}(d),function(n){n.prototype.$$mountComponent=function(){this.$$lifecycle("beforeMount"),this._vnode=this.$$render(l),function(n){var t=function(t){a(t),o(n[t])&&console.error('[iCrush warn]: Data property "'+t+'" has already been defined as a Method.');var e=n._data[t];n[t]=e,Object.defineProperty(n,t,{get:function(){return e},set:function(t){e=t,n.$$updateComponent()}})};for(var e in n._data)t(e)}(this),this.__isMounted=!0,this.$$lifecycle("mounted")},n.prototype.$$updateComponent=function(){this.$$lifecycle("beforeUpdate"),this.$$lifecycle("updated")},n.prototype.$$destroyComponent=function(){this.$$lifecycle("beforeDestroy"),this.$$lifecycle("destroyed")}}(d),function(n){!function(n){n.directive=function(n,t){},n.component=function(n,t){},n.filter=function(n,t){}}(n),function(n){n.use=function(t){t.install.call(t,n)}}(n)}(d),d.prototype.$$mount=function(){if(o(this._options.render))this.$$render=this._options.render;else{var n=this.template;n&&i(n)||(n=function(n){if(n.outerHTML)return n.outerHTML;var t=document.createElement("div");return t.appendChild(n.cloneNode(!0)),t.innerHTML}(this._el)),this.$$render=f(n)}this.$$mountComponent()},"object"===t(n)&&"object"===t(n.exports)?n.exports=d:window.iCrush=d}()}).call(this,e(4)(n))},function(n,t,e){"use strict";n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var e=function(n,t){var e=n[1]||"",r=n[3];if(!r)return e;if(t&&"function"==typeof btoa){var o=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=r.sources.map((function(n){return"/*# sourceURL="+r.sourceRoot+n+" */"}));return[e].concat(i).concat([o]).join("\n")}var s;return[e].join("\n")}(t,n);return t[2]?"@media "+t[2]+"{"+e+"}":e})).join("")},t.i=function(n,e){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(o=0;o<n.length;o++){var s=n[o];null!=s[0]&&r[s[0]]||(e&&!s[2]?s[2]=e:e&&(s[2]="("+s[2]+") and ("+e+")"),t.push(s))}},t}},function(n,t,e){var r,o,i={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),c=function(n,t){return t?t.querySelector(n):document.querySelector(n)},a=function(n){var t={};return function(n,e){if("function"==typeof n)return n();if(void 0===t[n]){var r=c.call(this,n,e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}t[n]=r}return t[n]}}(),u=null,l=0,f=[],d=e(7);function p(n,t){for(var e=0;e<n.length;e++){var r=n[e],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(g(r.parts[s],t))}else{var c=[];for(s=0;s<r.parts.length;s++)c.push(g(r.parts[s],t));i[r.id]={id:r.id,refs:1,parts:c}}}}function h(n,t){for(var e=[],r={},o=0;o<n.length;o++){var i=n[o],s=t.base?i[0]+t.base:i[0],c={css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(c):e.push(r[s]={id:s,parts:[c]})}return e}function b(n,t){var e=a(n.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===n.insertAt)r?r.nextSibling?e.insertBefore(t,r.nextSibling):e.appendChild(t):e.insertBefore(t,e.firstChild),f.push(t);else if("bottom"===n.insertAt)e.appendChild(t);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(n.insertAt.before,e);e.insertBefore(t,o)}}function y(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var t=f.indexOf(n);t>=0&&f.splice(t,1)}function m(n){var t=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var r=function(){0;return e.nc}();r&&(n.attrs.nonce=r)}return v(t,n.attrs),b(n,t),t}function v(n,t){Object.keys(t).forEach((function(e){n.setAttribute(e,t[e])}))}function g(n,t){var e,r,o,i;if(t.transform&&n.css){if(!(i="function"==typeof t.transform?t.transform(n.css):t.transform.default(n.css)))return function(){};n.css=i}if(t.singleton){var s=l++;e=u||(u=m(t)),r=w.bind(null,e,s,!1),o=w.bind(null,e,s,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(n){var t=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",v(t,n.attrs),b(n,t),t}(t),r=O.bind(null,e,t),o=function(){y(e),e.href&&URL.revokeObjectURL(e.href)}):(e=m(t),r=x.bind(null,e),o=function(){y(e)});return r(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap)return;r(n=t)}else o()}}n.exports=function(n,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=s()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var e=h(n,t);return p(e,t),function(n){for(var r=[],o=0;o<e.length;o++){var s=e[o];(c=i[s.id]).refs--,r.push(c)}n&&p(h(n,t),t);for(o=0;o<r.length;o++){var c;if(0===(c=r[o]).refs){for(var a=0;a<c.parts.length;a++)c.parts[a]();delete i[c.id]}}}};var $,j=($=[],function(n,t){return $[n]=t,$.filter(Boolean).join("\n")});function w(n,t,e,r){var o=e?"":r.css;if(n.styleSheet)n.styleSheet.cssText=j(t,o);else{var i=document.createTextNode(o),s=n.childNodes;s[t]&&n.removeChild(s[t]),s.length?n.insertBefore(i,s[t]):n.appendChild(i)}}function x(n,t){var e=t.css,r=t.media;if(r&&n.setAttribute("media",r),n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}function O(n,t,e){var r=e.css,o=e.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=d(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),c=n.href;n.href=URL.createObjectURL(s),c&&URL.revokeObjectURL(c)}},function(n,t,e){n.exports=e(10)},function(n,t){n.exports=function(n){return n.webpackPolyfill||(n.deprecate=function(){},n.paths=[],n.children||(n.children=[]),Object.defineProperty(n,"loaded",{enumerable:!0,get:function(){return n.l}}),Object.defineProperty(n,"id",{enumerable:!0,get:function(){return n.i}}),n.webpackPolyfill=1),n}},function(n,t,e){var r=e(6);"string"==typeof r&&(r=[[n.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(r,o);r.locals&&(n.exports=r.locals)},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"/*!\r\n* 统一不同浏览器的基础样式\r\n* git+https://github.com/yelloxing/normalize.css.git\r\n*\r\n* @since v0.1.0 \r\n* @public\r\n* \r\n* 引入方式：\r\n* import '@yelloxing/normalize.css';\r\n*/\r\n\r\nhtml {\r\n    /*\r\n  ------------------\r\n  防止iPhone在坚屏转向横屏时放大文字\r\n  ------------------\r\n  */\r\n    -ms-text-size-adjust: 100%;\r\n    -webkit-text-size-adjust: 100%;\r\n    /*\r\n  ------------------\r\n  统一行高\r\n  ------------------\r\n  */\r\n    line-height: 1.15;\r\n}\r\n\r\nbutton,\r\ninput {\r\n    /*\r\n  ------------------\r\n  兼容部分手机下border不显示问题\r\n  ------------------\r\n  */\r\n    border: 1px solid #b2b2bd;\r\n}\r\n\r\narticle,\r\nfooter,\r\nheader,\r\nnav,\r\nsection {\r\n    /*\r\n  ------------------\r\n  修正旧浏览器未定义的块级元素\r\n  ------------------\r\n  */\r\n    display: block;\r\n}\r\n\r\ncanvas,\r\nsvg {\r\n    /*\r\n  ------------------\r\n  修正旧浏览器未定义的行内块元素\r\n  ------------------\r\n  */\r\n    display: inline-block;\r\n}\r\n\r\n* {\r\n    /*\r\n  ------------------\r\n  统一不同浏览器盒子尺寸计算方法\r\n  ------------------\r\n  */\r\n    box-sizing: border-box;\r\n}\r\n\r\n::-ms-clear,\r\n::-ms-reveal {\r\n    /*\r\n  ------------------\r\n  去掉IE浏览器输入框叉叉和眼睛\r\n  ------------------\r\n  */\r\n    display: none;\r\n}\r\n\r\nimg {\r\n    /*\r\n  ------------------\r\n  针对火狐浏览器在img标签没有src时候的差异修复\r\n  ------------------\r\n  */\r\n    display: inline-block;\r\n}\r\n\r\nhtml {\r\n    /*\r\n  ------------------\r\n  设置默认字体为统一的安全字体\r\n  ------------------\r\n  */\r\n    font-family: sans-serif;\r\n}\r\n\r\na {\r\n    /*\r\n  ------------------\r\n  默认去掉下划线\r\n  ------------------\r\n  */\r\n    text-decoration: none;\r\n}\r\n\r\nli {\r\n    /*\r\n  ------------------\r\n  去掉前置索引\r\n  ------------------\r\n  */\r\n    list-style-type: none;\r\n}\r\n\r\nul,\r\nol,\r\nli,\r\np,\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6 {\r\n    /*\r\n  ------------------\r\n  去掉不喜欢的间距\r\n  ------------------\r\n  */\r\n    -webkit-margin-before: 0;\r\n    -webkit-margin-after: 0;\r\n    -webkit-padding-start: 0;\r\n    /*\r\n  ------------------\r\n  去掉不喜欢的间距，针对火狐浏览器等\r\n  ------------------\r\n  */\r\n    margin-block-end: 0;\r\n    margin-block-start: 0;\r\n    padding-inline-start: 0;\r\n    /*\r\n  ------------------\r\n  修改IE和其它浏览器不一致问题\r\n  ------------------\r\n  */\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\nbody {\r\n    /*\r\n  ------------------\r\n  去掉默认的8px\r\n  ------------------\r\n  */\r\n    margin: 0;\r\n}\r\n\r\ntable {\r\n    /*\r\n  ------------------\r\n  设置默认表格边框合并为一个单一的边框\r\n  ------------------\r\n  */\r\n    border-collapse: collapse;\r\n}\r\n",""])},function(n,t){n.exports=function(n){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var e=t.protocol+"//"+t.host,r=e+t.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(n,t){var o,i=t.trim().replace(/^"(.*)"$/,(function(n,t){return t})).replace(/^'(.*)'$/,(function(n,t){return t}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?n:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?e+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")}))}},function(n,t,e){var r=e(9);"string"==typeof r&&(r=[[n.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(r,o);r.locals&&(n.exports=r.locals)},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"html {\r\n  font-size: 100px;\r\n}\r\n\r\nbody {\r\n  font-size: .16rem;\r\n}",""])},function(n,t,e){"use strict";e.r(t);var r=e(0),o=e.n(r),i=(e(5),e(8),{install:function(n){n.prototype.$remote={get:function(n,t,e,r){console.log("get",n,t,e,r)},post:function(n,t,e,r,o){console.log("post",n,t,e,r,o)}}}}),s={template:"<div>例子</div>"};o.a.use(i),window.icrush=new o.a({el:document.getElementById("root"),render:function(n){return n(s)},created:function(){console.warn(this)}})}]);