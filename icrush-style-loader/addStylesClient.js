export default function addStylesClient(parentId, list, _isProduction, _options, isICrushStyle) {

    var styleElement = document.createElement('style');
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = list[0][1];

    // 如果是iCrush内置样式，添加data-icrush-hash
    if (isICrushStyle) {
        style = style.replace(/( {0,}){/g, "[" + parentId + "]{");
    }

    styleElement.innerHTML = style;
    styleElement.type = 'text/css';
    head.appendChild(styleElement);

};