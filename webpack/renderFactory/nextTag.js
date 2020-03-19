module.exports = function (template) {

    let i = -1;

    // 获取下一个字符
    let next = () => i++ < template.length - 1 ? template[i] : null;

    // 回退一个
    let goBack = () => i--;

    // 定义几种状态

    // 获取下一个半标签、自闭合标签或普通文本
    // 返回一个字符串，如果已经没有了，返回null
    return function () {

        // 分别记录当前面对的字符和已经获取的模板
        let charStr = next(), tagTemplate = "";

        // 首先，需要确定当前状态
        while (charStr !== null && /[\x20\t]/.test(charStr)) charStr = next();

        // 标记是否在寻找Tag
        let isTag = charStr == '<' ? true : false;

        if (charStr == null) return null;

        // 针对字符串可能包含“>”和“<”的推迟支持
        while (charStr !== null && ((isTag && charStr != ">") || (!isTag && charStr != "<"))) {
            tagTemplate += charStr;
            charStr = next();
        }

        if (isTag) {
            tagTemplate += ">";
        } else if (charStr == '<') {
            goBack();
        }

        return tagTemplate;
    };

};