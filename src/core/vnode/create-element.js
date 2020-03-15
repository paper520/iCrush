/**
 * 备注：未来这里可能会修改成虚拟结点，进行优化
 * =========================================
 * 组件控制范围内的重要信息收集
 */

import isString from '@yelloxing/core.js/isString';

/**
 * 创建vnode方法，并收集信息
 * @param {string} tagName 结点名称
 * @param {json} attrs 属性
 * @param {array[vnode|string]} children 孩子元素 
 * @return {element} 返回vnode
 */
export default function (tagName, attrs, children) {

  const node = document.createElement(tagName);

  let directive = [], event = [], textBind = [], component = [], dynamicComponent = [];

  let isDynamicComponent = false;

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
    isDynamicComponent = true;

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

};