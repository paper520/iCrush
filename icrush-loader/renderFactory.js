module.exports = function (template, id) {

  let doit = function (Engine) {

    let value = Engine.valueOf();
    if (require('@yelloxing/core.js').isString(value)) {

      // 由于回车的问题，非`的字符串不支持，我们需要使用转义替换
      return JSON.stringify(value.replace(/[\n\r]/g, '↵'));
    } else {

      let childrenRender = "[", childrenNode = Engine.children();

      for (let i = 0; i < childrenNode.length; i++) {
        childrenRender += doit(childrenNode.eq(i)) + ",";
      }
      childrenRender = childrenRender.replace(/,$/, '') + "]";

      value.attrs['data-icrush-' + id] = "";

      return `createElement('${value.tagName}',${JSON.stringify(value.attrs)},${childrenRender})`;

    }

  };


  // template -> render依赖一个专门解析xhtml的库： https://github.com/yelloxing/xhtml-engine
  let Engine = require('xhtml-engine')(template.trim());

  let renderString = `function (createElement) {
    return ${doit(Engine)};
};`;

  // console.log(renderString);

  return renderString;
};