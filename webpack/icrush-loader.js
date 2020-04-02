
// icrush-loader

module.exports = function loader(source) {
    let code1 = require('./render-html.js')(source, "style");
    let code2 = require('./render-html.js')(source, "script");
    let code3 = require('./render-html.js')(source, "template");
    debugger

    const loaderContext = this;

    const {
        resourcePath,
        resourceQuery
    } = loaderContext;

    const rawQuery = resourceQuery.slice(1);

    const incomingQuery = require('querystring').parse(rawQuery);

    if (incomingQuery.type) {

        let code = require('./render-html.js')(source, incomingQuery.type);

        return `export default ${code}`;

    } else {
        return `

            // 导入js
            import script from '${resourcePath}?iCrush&type=script&lang=js&';
            export * from '${resourcePath}?iCrush&type=script&lang=js&';

            // 导入css
            import * from '${resourcePath}?iCrush&type=style&lang=css&';

            // 导入html
            import template from '${resourcePath}?iCrush&type=template';

            export default {
                tempalte,
                ...script
            };
        `;
    }

};