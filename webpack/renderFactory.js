module.exports = function (template) {

  let doit = function (Engine) {

    let value = Engine.valueOf();
    if (require('@yelloxing/core.js').isString(value)) {
      return "'" + value + "'";
    } else {

      let childrenRender = "[", childrenNode = Engine.children();

      for (let i = 0; i < childrenNode.length; i++) {
        childrenRender += doit(childrenNode.eq(i)) + ",";
      }
      childrenRender = childrenRender.replace(/,$/, '') + "]";

      return `createElement('${value.tagName}',${JSON.stringify(value.attrs)},${childrenRender})`;

    }

  };

  let Engine = require('xhtml-engine')(template.trim());

  let renderString = `function (createElement) {
    return ${doit(Engine)};
};`;

  // console.log(renderString);

  return renderString;
};