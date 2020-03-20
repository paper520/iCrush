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

    attrsArray = template.replace(/^</, '').replace(/[/]{0,1}>$/, '').trim().split(/ +/);

    let attrs = {};
    for (let i = 1; i < attrsArray.length; i++) {
        let attr = attrsArray[i].split('=');
        attrs[attr[0]] = attr[1];
    }

    return {
        tagName: attrsArray[0],
        attrs
    };

};