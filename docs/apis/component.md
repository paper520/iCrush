# [iCrush](https://github.com/yelloxing/iCrush) 📚 内置组件

- 动态组件：component

```html
<component :is='page'></component>
```

通过修改page的值可以动态修改挂载的组件，page是当前组件的data中的一个值：

```js
new iCrush({
  data(){
    return {
      page:null
    };
  }
});
```

在任何时候通过this.page=newPage的形式修改都可以同步更新组件。

Copyright (c) 2020 走一步 再走一步 

[返回首页](../index.md)