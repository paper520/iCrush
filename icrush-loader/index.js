// icrush-loader

const path = require('path');
const qs = require('querystring');
const hash = require('hash-sum');

module.exports = function loader(source) {

  const loaderContext = this;

  const {
    rootContext,
    resourcePath,
    resourceQuery
  } = loaderContext;

  const filename = path.basename(resourcePath);
  const rawQuery = resourceQuery.slice(1);
  const incomingQuery = qs.parse(rawQuery);
  const context = rootContext || process.cwd();

  const rawShortFilePath = path
    .relative(context, resourcePath)
    .replace(/^(\.\.[\/\\])+/, '');

  const id = hash(rawShortFilePath);

  if (incomingQuery.type) {

    let code = require('./render-html.js')(source, incomingQuery.type);

    if (incomingQuery.type == 'style') {
      if (code.length > 0) {
        code = `export default \`${code}\``;
      } else if (/^export default/.test(source)) {
        code = source.replace(/^export default `/, '').replace(/`$/, '');
      }
    } else if (incomingQuery.type == 'script') {
      if (code.length <= 0) {
        if (/\/\*icrush-loader-es\*\/$/.test(source)) {
          code = source;
        } else {
          code = 'export default {};';
        }
      } else {
        code += "\n/*icrush-loader-es*/";
      }
    }

    loaderContext.callback(null, code);

    return;

  } else {

    let code = require('./render-html.js')(source, 'template');
    code = require('./renderFactory')(code, id);

    let exportCode = `
            // 导入js
            import script from './${filename}?iCrush&type=script&lang=js&hash=${id}&';
            // 导入css
            import './${filename}?iCrush&type=style&lang=css&hash=${id}&';
            
            script.render=${code};
            export default script;
        `;

    return exportCode;
  }

};