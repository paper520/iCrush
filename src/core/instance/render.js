import createElement from '../vnode/create-element';
import mountDom from '../vnode/mount-dom';
import watcher from '../observe/watcher';

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

        this.__directiveTask = {};
        this.__componentTask = {};
        this.__filterTask = {};

        // 以指令为例，指令在挂载的真实DOM销毁的时候，应该主动销毁自己
        // 类似这样的管理应该由指令自己提供
        mountDom(this, '_vnode', this._el, iCrush);

        // 挂载好了以后，启动监听
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

};

import { toNode } from '../../helper';
import isElement from '@yelloxing/core.js/isElement';
import isText from '@yelloxing/core.js/isText';

/**
 * 根据字符串模板生成render函数
 * @param {string} template 字符串模板
 * @return {function} render函数
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