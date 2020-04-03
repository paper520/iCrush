
// icrush-loader

const path = require('path');
const qs = require('querystring');

module.exports = function loader(source) {

    const loaderContext = this;

    const {
        resourcePath,
        resourceQuery
    } = loaderContext;

    const filename = path.basename(resourcePath)

    const rawQuery = resourceQuery.slice(1);

    const incomingQuery = qs.parse(rawQuery);

    if (incomingQuery.type) {

        let code = require('./render-html.js')(source, incomingQuery.type);

        if (incomingQuery.type == 'script') {
            code = code || "export default{}";
        } else {
            code = `export default \`${code}\``;
        }

        loaderContext.callback(null, code);

        return;

    } else {
        let exportCode = `

            // 导入js
            import script from './${filename}?iCrush&type=script&lang=js&';

            // 导入css
            import './${filename}?iCrush&type=style&lang=css&';

            // 导入html
            import template from './${filename}?iCrush&type=template';

            script.template=template;

            export default script;
        `;

        // console.log(exportCode);

        return exportCode;
    }

};