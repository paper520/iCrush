function split(template) {

    let nextTag = require('./nextTag')(template.replace(/[\n\f\r]/g, ' ').trim()), tag = nextTag();

    // 分割出来不同的模板内容
    let tags = {
        template: [],
        script: ""
    };

    let hadSaveTemplate = false, beginSaveTemplate = false;
    let hadSaveScript = false, beginSaveScript = false;

    // 模板分组开始
    while (tag !== null) {

        // 如果在收集模板
        if (beginSaveTemplate && !hadSaveTemplate) {

            // 目前先不考虑模板中有<template>标签
            if (tag.template == '</template>') {
                hadSaveTemplate = true;
            } else {
                tags.template.push(tag);
            }
        }

        // 如果在收集JS
        else if (beginSaveScript && !hadSaveScript) {
            if (tag.type == 'text') {
                tags.script = tag.template;
            }

            // JS比较特殊，收集到以后就可以立刻结束
            hadSaveScript = true;
        } else if (tag.template == '<template>') {

            // 标记可以开始记录模板
            beginSaveTemplate = true;
        } else if (tag.template == '<script>') {

            // 标记可以开始记录js
            beginSaveScript = true;
        } else {

            // 加速判断
            break;
        }
        tag = nextTag();
    }

    return tags;
};

// renderFactory
// 输入的tagsTemplate是经过split处理后得到的更友好的格式
module.exports = function (tagsTemplate) {

    console.log('==========================================');

    let deepArray = require('./toDeepArray')(tagsTemplate);

    console.log(deepArray);
    console.log('==========================================');

    return "";

};

module.exports.iCrushLoaderSplit = split;