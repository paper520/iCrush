/**
 * 解析标签的属性和标签名
 * 
 * 返回格式：
 * 
 * {
 * 
 * tagName：string,
 * attrs:{}
 * 
 * }
 * 
 */
module.exports = function (template) {

    return {
        tagName: "div",
        attrs: {
           "aa":"1",
           "bb":"2"
        }
    };

};