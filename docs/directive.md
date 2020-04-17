# [iCrush](https://github.com/yelloxing/iCrush) 📚 🚧 🎮 如何自定义指令来强化标签属性?

组件是强化原生标签，指令是强化原生属性，因此用法和原生属性类似，比如我们有一个属性name：

```html
  <input name />
```

如何自定义指令？自定义指令和组件类似，比如使用iCrush上的方法：

```js
iCrush.directive('iDemo',{

  // 指令生效的时候
  inserted:function(el,binding){},

  // 被绑定于元素所在的组件中有数据更新时调用，而无论绑定值是否变化
  update:function(el,binding){},

  // 只调用一次，指令与元素解绑时调用
  delete:function(el,binding){}
});
```

我们来看看binding中有什么：

```js
binding={

    // 当前iCrush对象
    target,
    
    // 指令的属性值
    exp,
    
    // 指令的属性值在当前iCrush中编译后的值
    value,
    
    // 比如i-attr:XXX,表示的就是XXX
    type
}
```

当然，指令和组件一样，也支持局部挂载。

Copyright (c) 2020 走一步 再走一步 

[返回首页](./index.md)
