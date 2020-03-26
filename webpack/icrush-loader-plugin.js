
// icrush-loader-plugin

const pluginName = 'iCrushLoaderPlugin';

class taskLoaderPlugin {
    apply(compiler) {

        // 每次编译前调用
        compiler.hooks.make.tap(pluginName, compilation => {
            console.log('\u001B[96m👉   Thank you for using (\u001B[94m https://github.com/yelloxing/iCrush \u001B[96m) as the JS Library! \u001B[0m\n');
        });

    }
}

module.exports = taskLoaderPlugin;
