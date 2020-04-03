/**
 * .iCrush文件中分离出来的lang=css,lang=js等文件，进行loader配置扩展
 */

const pluginName = 'iCrushLoaderPlugin';

class iCrushLoaderPlugin {
    apply(compiler) {

        compiler.hooks.make.tap(pluginName, compilation => {

            console.log(`
            ------------------------------------
                 iCrushLoaderPlugin:开发中
            ------------------------------------
            `);

        });

    }
}

module.exports = iCrushLoaderPlugin;


