/**
 * createElement方法
 * =========================================
 * 组件控制范围内的重要信息收集
 */

import isString from '@yelloxing/core.js/isString';

/**
 * 创建vnode方法，并收集信息
 * @param {string|json} tagName或组件 结点名称或组件
 * @param {json} attrs 属性
 * @param {array[vnode|string]} children 孩子元素 
 * @return {element} 返回vnode
 */
export default function (tagName, attrs, children) {

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
                newAttrs[key.replace(/^@/, 'v-on:')] = attrs[key];
            }

            // 如果是简化的:attr=""
            else if (/^:/.test(key)) {
                newAttrs['v-bind' + key] = attrs[key];
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
                    newChildren.push({
                        type: 'text',
                        content: child
                    });
                }
            } else {
                newChildren.push(child);
            }
        }

    } else {
        return {
            // 一共分三类：
            // 1.component普通组件
            // 2.tag普通标签
            // 3.dynamicComponent动态组件
            // 4.text普通文本
            // 5.bindText存在动态文本
            type: 'component',
            component: tagName
        };
    }

    return {
        // none表示需要进一步确认
        type: 'none',
        tagName, attrs: newAttrs, children: newChildren
    };

};