const __ = require('@yelloxing/core.js');

// 根据层次生成应该修改的key
let toKey = function (deepArray) {
    let key = "";
    // 孩子都保存在属性children下
    // link表示的是第几个孩子
    for (let i = 0; i < deepArray.length; i++) {
        let link = deepArray[i];
        key += ".children[" + link + "]";
    }
    return key.replace('.', '');
};

// 把分析出来的模板数组重新组织成有层次结构的
module.exports = function (tagsTemplate) {

    // 分别用于记录当前面对的层次路径、目标格式和待闭合的标签
    let deepArray = [], deepLink = {}, hopeAcceptNum = 0;

    // 由于存放数据的key比较特殊，定义一个方法来设置
    let pushData = function (data) {
        if (deepArray.length == 0) {

            // 对于根，我们特殊处理一下
            deepLink = {
                tag: data.template,
                type: data.type,
                children: []
            };
        } else {

            // 先获取保存的key
            let key = toKey(deepArray);

            // 然后调用set方法设置
            __.set(deepLink, key, {
                tag: data.template,
                type: data.type,
                children: []
            })
        }
    };

    // 遍历分析
    for (let i = 0; i < tagsTemplate.length; i++) {

        let tag = tagsTemplate[i];

        // 如果是开始标签
        // 直接作为当前层次的最后一个push进去即可
        if (tag.flag == 'begin') {

            hopeAcceptNum++;
            pushData(tag);
            deepArray.push(0);

        }

        // 如果是结束标签
        // 意味着层次减1并消除一个闭合标签
        // （注意：初始化版本为了减低，没有去校验闭合是否合理）
        else if (tag.flag == 'end') {

            hopeAcceptNum--;
            deepArray.pop();
            deepArray[deepArray.length - 1] += 1;

        }

        // 除了开始和闭合标签，其余的（文本和自闭合标签）我们认为自己作为一个结点即可
        else {
            pushData(tag);
            deepArray[deepArray.length - 1] += 1;
        }

    }

    // 如果分析结束了闭合数没有归零
    // 肯定存在错误
    if (hopeAcceptNum > 0) {
        throw new Error('No End!');
    }

    return deepLink;
};