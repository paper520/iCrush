/**
 * =========================================
 * 本文件用于提供一些零碎的方法
 */

import isElement from '@yelloxing/core.js/isElement';

/**
 * 获取结点的outHTML
 * @param {node} el 结点
 * @return {string} 字符串模板
 */
export function outHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML;
    } else {
        const container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
    }
};

/**
 * 把字符串模板变成结点
 * @param {node|string} template 结点或字符串模板
 * @return {node} 结点
 */
export function toNode(template) {
    if (isElement(template)) {
        return template;
    }

    // 如果是字符串模板
    const container = document.createElement('div');
    container.innerHTML = template.replace(/[\n\f\r]/g, '').trim();
    return container.firstElementChild;
};

/**
 * 判断是否是合法的方法或数据key
 * @param {string} key 
 */
export function isValidKey(key) {
    // 判断是不是_或者$开头的
    // 这两个内部预留了
    if (/^[_$]/.test(key)) {
        console.error('[iCrush warn]: The beginning of _ or $ is not allowed：' + key);
    }
};

/**
 * 在指定上下文下获取字符串的值
 * @param {object} target 
 * @param {'string'} text 
 * @return {string} 解析后的字符串
 */
export function compilerText(target, text) {
    let getText = function (str) {
        return eval(str);
    };

    return getText.call(target, text);
}

/**
 * 把类似'DIV'、'ui-router'和'UI-ROUTER'等分别变成'div','uiRouter','uiRouter'等
 * @param {string} tagName 
 */
export function templateToName(tagName) {
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
    };

    return newTagName;
};

/**
 * 替换DOM
 * @param {DOM} oldEl 
 * @param {DOM} newEl 
 */
export function replaceDom(oldEl, newEl) {
    oldEl.parentNode.replaceChild(newEl, oldEl);
};