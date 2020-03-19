function split(template) {

    let nextTag = require('./nextTag')(template.replace(/[\n\f\r]/g, ' ').trim()), tag = nextTag();

    while (tag !== null) {
        console.log("##" + JSON.stringify(tag) + "##");
        tag = nextTag();
    }

};

// renderFactory
// 输入的tags是经过split处理后得到的更友好的格式
module.exports = function (tags) {



};

module.exports.iCrushLoaderSplit = split;