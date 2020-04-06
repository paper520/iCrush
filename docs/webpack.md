# [iCrush](https://github.com/yelloxing/iCrush) 📚 如何基于webpack使用iCrush开发项目？

> 为了方便你的查阅，你可以对照[webpack基本架子](https://github.com/yelloxing/iCrush/tree/master/examples/webpack)来查看。

和别的使用webpack打包的项目一样，我们需要安装必要的loader和插件然后在[webpack.config.js](https://github.com/yelloxing/iCrush/tree/master/examples/webpack/webpack.common.js)中进行配置。

因为是使用iCrush开发，你需要额外安装它：

```bash
npm install --save icrush
```

安装好了之后，需要为.iCrush文件配置loader:

```js
{
    test: /\.iCrush$/,
    loader: ['icrush/webpack/icrush-loader.js']
},{
  {
    test: /\.css$/,
    loader: ['style-loader', 'icrush/webpack/icrush-style-loader.js', 'css-loader']
  }
}
```

此外，loader还依赖插件，我们需要引入并使用：

```js
const iCrushLoaderPlugin = require('icrush/webpack/icrush-loader-plug');

// webpack中使用插件
plugins: [
  new iCrushLoaderPlugin()
]
```

icrush-loader用于解析.iCrush文本生成组件导出。

这样你就可以把一个.iCrush文件看成一个组件，直接使用import或别的方式引入来拼接成完整的页面即可，其余的和非webpack项目一样。

关于.iCrush文件，格式如下：

```html
<template>
  <!-- 页面模板 -->
</template>

<script>
  /*可以在这里引入更多.iCrush文件*/
  export default {
    /*类似控制器的地方*/
  };
</script>

<style>
 /*写样式的地方，所有的样式只会对当前的组件有效*/
</style>
```

需要注意的是template必须有一个根节点。

Copyright (c) 2020 走一步 再走一步 

[返回首页](./index.md)