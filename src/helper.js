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
    container.innerHTML = template;
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
        throw new Error('The beginning of _ or $ is not allowed：' + key);
    }
};