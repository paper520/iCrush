const __ = require('@yelloxing/core.js');

let toKey = function (deepArray) {
    let key = "";
    for (let i = 0; i < deepArray.length; i++) {
        let link = deepArray[i];
        key += ".children[" + link + "]";
    }
    return key.replace('.', '');
};

module.exports = function (tagsTemplate) {
    let deepArray = [], deepLink = {}, hopeAcceptNum = 0;

    let pushData = function (data) {
        if (deepArray.length == 0) {
            deepLink = {
                tag: data.template,
                type: data.type,
                children: []
            };
        } else {
            let key = toKey(deepArray);
            __.set(deepLink, key, {
                tag: data.template,
                type: data.type,
                children: []
            })
        }
    };

    for (let i = 0; i < tagsTemplate.length; i++) {

        let tag = tagsTemplate[i];

        // 如果是开始标签
        // 直接作为当前层次的最后一个push进去即可
        if (tag.flag == 'begin') {

            hopeAcceptNum++;
            pushData(tag);
            deepArray.push(0);

        } else if (tag.flag == 'end') {

            hopeAcceptNum--;
            deepArray.pop();
            deepArray[deepArray.length - 1] += 1;

        } else {
            pushData(tag);
            deepArray[deepArray.length - 1] += 1;
        }

    }

    if (hopeAcceptNum > 0) {
        throw new Error('No End!');
    }

    return deepLink;

};