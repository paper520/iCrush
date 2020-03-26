# [iCrush](https://github.com/yelloxing/iCrush) 📚 使用指令强化标签属性

组件是强化原生标签，指令是强化原生属性，先来看看内置的指令有哪些：

- i-model:双向绑定，一般用于输入框，可以实现视图和数据之间的同步

```html
  <input i-model='param'/>
```

其中param需要提前在data中注册（下同）。

- i-bind:单项数据绑定，只会主动同步数据到视图

```html
  <div i-bind='param' i-bind:param='param'></div>
```

上面我们演示了二种用法，第一种会修改标签的value或innerText,第二种会修改标签的param属性。

再来看个例子：

```
<div>{{param}}</div>
```

上面的写法类似i-bind的第一种用法。

- i-on:用于在标签中注册DOM事件

```html
<div i-on:click='doit()'>点击我</div>
```

上面我们演示的是单击，如果把.click改成.dblclick就是双击，别的DOM事件也类似。

除此之外，还有几个特殊的选项（可以同时使用）：

```html
<div i-on:click.once='doit()'>点击我</div>
```

上面我们添加了.once，表示点击一次后就会失效,一共有以下可选： 

 * prevent 阻止默认事件
 * stop    阻止冒泡
 * once    只执行一次

 有时候为了方便，i-on.可以用@代替，比如开始的例子改写一下：

 ```html
<div @click='doit()'>点击我</div>
```

## 自定义指令

自定义指令和组件类似，比如使用iCrush上的方法：

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