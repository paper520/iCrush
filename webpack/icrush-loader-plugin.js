
// icrush-loader-plugin

const pluginName = 'iCrushLoaderPlugin';

class taskLoaderPlugin {
    apply(compiler) {

        // 每次编译前调用
        compiler.hooks.make.tap(pluginName, compilation => {
            console.log('// icrush-loader-plugin');
        });

    }
}

module.exports = taskLoaderPlugin;
