# iCrush
📚 一个渐进型的前端小框架

<a href="https://yelloxing.github.io/npm-downloads/?interval=7&packages=icrush"><img src="https://img.shields.io/npm/dm/icrush.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/icrush"><img src="https://img.shields.io/npm/v/icrush.svg" alt="Version"></a>
<a href="https://github.com/yelloxing/icrush/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/icrush.svg" alt="License"></a>

> v1版本研发中，敬请期待，也欢迎你的加入，你可以[点击此处](https://github.com/yelloxing/iCrush/tree/version-0.1)查看v0.1版本！

## Issues
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/yelloxing/iCrush/issues)！

因为是学习项目，我们目前不打算给出使用文档，不过我们有一个[完整用例](https://github.com/yelloxing/iCrush/tree/master/demo)可供参考，里面会提供各种用法并添加好备注。

## How to use?
如果你开发的是一个web项目，直接在页面引入打包后的文件后即可（在代码中通过iCrush调用）：

```html
<script src="./dist/iCrush.min.js" type="text/javascript"></script>
```

如果你想通过npm方式管理，首先你需要通过命令行安装iCrush，就像这样：

```bash
npm install --save icrush
```

安装好了以后，在需要的地方引入即可：

```js
import iCrush from 'icrush';
```

或

```js
const iCrush = require("icrush");
```

## License

[MIT](https://github.com/yelloxing/iCrush/blob/master/LICENSE)

Copyright (c) 2020 走一步 再走一步
