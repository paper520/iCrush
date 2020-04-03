# [iCrush](https://github.com/yelloxing/iCrush) 📚 一个渐进型的前端小框架

> 特别注意：本项目的主要目的是学习和测试一些框架和打包工具等

<a href="https://yelloxing.github.io/npm-downloads/?interval=7&packages=icrush"><img src="https://img.shields.io/npm/dm/icrush.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/icrush"><img src="https://img.shields.io/npm/v/icrush.svg" alt="Version"></a>
<a href="https://github.com/yelloxing/icrush/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/icrush.svg" alt="License"></a>

## Issues
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/yelloxing/iCrush/issues)！

你可以[查阅文档](https://github.com/yelloxing/iCrush/blob/master/docs/index.md)获得接口API和入门教程。

## How to use?

首先你需要通过命令行安装iCrush，就像这样：

```bash
npm install --save icrush
```

安装好了以后，在需要的地方引入即可：

```js
import iCrush from 'icrush';
```

iCrush设计的思想是组件，一个完整的页面由一系列并列或包含的组件拼接而成，但是，根组件只有一个：

```js
// 引入别的组件
// 在这个组件里面，又可以引入组件，这样一层层拼接
// 当然，每次并列引入的组件理论上可以任意多
import App from './App.iCrush';

// 根对象
window.icrush = new iCrush({

  // 挂载点
  el: document.getElementById('root'),

  // 配置启动方法
  render: createElement => createElement(App),

  // 还可以添加方法或生命周期钩子等

});
```

你可能会好奇App.iCrush的格式：

```html
<template>
  <!-- 页面模板 -->
</template>

<script>
  export default {
    /*类似控制器的地方*/
  };
</script>

<style>
 /*写样式的地方*/
</style>
```

更多细节请[查阅文档](https://github.com/yelloxing/iCrush/blob/master/docs/index.md)获得帮助。

如何调试loader？
--------------------------------------

首先进入test/webpack例子项目，运行：

```bash
npm run debug
```

在需要调试的地方提前添加“ debugger ”语句，这和普通的web端调试一样，接着，在chrome浏览器地址栏中输入：

```
chrome://inspect/#devices
```

接着，请点击“ Open dedicated DevTools for Node ”后进入调试界面。

## License

[MIT](https://github.com/yelloxing/iCrush/blob/master/LICENSE)

Copyright (c) 2020 走一步 再走一步
