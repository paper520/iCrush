
// icrush-loader

const renderFactory = require('./renderFactory/index');
const iCrushLoaderSplit = require('./renderFactory/index').iCrushLoaderSplit;

module.exports = function loader(source) {

    // 把字符串按照标签和普通字符串进行切割，方便后续操作
    let tags = iCrushLoaderSplit(source);

    // 返回最终的结果
    // 其实就是一个标准的iCrush组件
    let renderStr = tags.script.replace('export default {', 'export default {render:function(createElement){' + renderFactory(tags.template) + "},");
   
    // console.log(renderStr);

    return renderStr;
};