
// icrush-loader

const renderFactory = require('./renderFactory/index');
const iCrushLoaderSplit = require('./renderFactory/index').iCrushLoaderSplit;

module.exports = function loader(source) {

    console.log(iCrushLoaderSplit(source));

    return `export default {
        template:"<div>例子</div>"
    };`;

};