import createElement from '../vnode/create-element';
import mountDom from '../vnode/mount-dom';
import watcher from '../observe/watcher';
import isFunction from '@yelloxing/core.js/isFunction';
import get from '@yelloxing/core.js/get';

import { compilerText } from '../../helper';

export function renderMixin(iCrush) {

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
            let content = compilerText(this, bindText.content).replace(/↵/g, '\n');
            if (bindText.el.textContent != content) {
                bindText.el.textContent = content;
            }
        }

        // 更新组件挂载点的属性
        for (let i = 0; i < this.__componentTask.length; i++) {
            let component = this.__componentTask[i];

            // 对于内置的动态组件进行调用，其余的组件当前是隔绝的
            if (component.instance._name == "component") {
                let pageKey = component.attrs['i-bind:is'];
                component.instance.lister(iCrush, this[pageKey]);
            }
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

};

import { toNode } from '../../helper';
import isElement from '@yelloxing/core.js/isElement';
import isText from '@yelloxing/core.js/isText';

/**
 * 根据字符串模板生成render函数
 * @param {string} template 字符串模板
 * @return {function} render函数
 * 
 * 特别注意：
 * 为了减小打包大小，我们在运行时生成render函数的方法借助浏览器的接口实现，node版本的只有在打包阶段才会调用。
 * 
 */
export function createRenderFactroy(template) {

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

};