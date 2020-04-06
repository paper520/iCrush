/**
 * .iCrush文件中分离出来的lang=css,lang=js等文件，进行loader配置扩展
 * 
 * 例如：
 *  XXX.iCrush?iCrush&type=script&lang=js&hash=???&
 *  XXX.iCrush?iCrush&type=style&lang=css&hash=???&
 * 
 */

const pluginName = 'iCrushLoaderPlugin';
const namespace = 'icrush-loader';

const RuleSet = require('webpack/lib/RuleSet');
const qs = require('querystring');

class iCrushLoaderPlugin {
    apply(compiler) {

        // 添加namespace标记方便loader发现错误
        compiler.hooks.compilation.tap(pluginName, compilation => {

            // webpack4，别的版本的没有去兼容，目前
            let normalModuleLoader = compilation.hooks.normalModuleLoader;
            normalModuleLoader.tap(pluginName, loaderContext => {
                loaderContext[namespace] = true;
            })

        });

        const rawRules = compiler.options.module.rules;
        const { rules } = new RuleSet(rawRules)

        const clonedRawRules = cloneRule(rawRules);
        const clonedRules = new RuleSet(clonedRawRules).rules;


        // 使用新的规则替换旧的
        compiler.options.module.rules = [
            ...clonedRules,
            ...rules
        ];

    }
}

function cloneRule(rawRules) {

    // 我们去匹配处理js和css的
    // 后期可以考虑ts，scss等更灵活的写法
    let clonedRawRules = rawRules.filter(rule => (rule.test.test('XXX.js')) || (rule.test.test('XXX.css')));

    let iCrushLoader = rawRules.filter(rule => rule.test.test('XXX.iCrush'));

    if (iCrushLoader.length <= 0) {
        throw new Error(
            `[${pluginName} Error] No matching use for icrush-loader is found.\n` +
            `Make sure the rule matching .iCrush files include iCrush-loader in its use.`
        )
    }

    for (let i = 0; i < clonedRawRules.length; i++) {
        if (clonedRawRules[i].test.test('XXX.js')) {

            // 匹配js
            clonedRawRules[i].test = resource => true;
            clonedRawRules[i].resourceQuery = query => {
                const parsed = qs.parse(query.slice(1));
                return parsed.iCrush != null && parsed.type == 'script';
            }
        } else {

            // 匹配css
            clonedRawRules[i].test = resource => true;
            clonedRawRules[i].resourceQuery = query => {
                const parsed = qs.parse(query.slice(1));
                return parsed.iCrush != null && parsed.type == 'style';
            }
        }

        if (require('@yelloxing/core.js').isString(clonedRawRules[i].loader)) {
            clonedRawRules[i].loader = [clonedRawRules[i].loader];
        }

        if (require('@yelloxing/core.js').isString(iCrushLoader[0].loader)) {
            clonedRawRules[i].loader.push(iCrushLoader[0].loader);
        } else {
            for (let j = 0; j < iCrushLoader[0].loader.length; j++) {
                clonedRawRules[i].loader.push(iCrushLoader[0].loader[j]);
            }
        }

    }

    return clonedRawRules;

};

module.exports = iCrushLoaderPlugin;


