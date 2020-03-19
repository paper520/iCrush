
// icrush-loader

const renderFactory = require('./renderFactory/index');
const iCrushLoaderSplit = require('./renderFactory/index').iCrushLoaderSplit;

module.exports = function loader(source) {

    // 把字符串按照标签和普通字符串进行切割，方便后续操作
    console.log(iCrushLoaderSplit(source));

    return `export default {
        template:"<div>例子</div>"
    };`;

};