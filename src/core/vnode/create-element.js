
/**
 * createElement方法
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
export default function (tagName, attrs, children) {

    // 设计中
    return {
        tagName, attrs, children
    };

};