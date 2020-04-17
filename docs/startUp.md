# [iCrush](https://github.com/yelloxing/iCrush) 📚 🚧 🎮 快速开始使用iCrush构建自己的项目

设计的理念是：网站是由一个个iCrush组件平行或嵌套拼接而成的，每个组件管理页面中的一部分，组件之间可以通信。

因此，首先我们来看看组件是什么？下面是创建一个组件的最本原的形式：

```js
new iCrush({

    // 挂载点
    el:select|dom,

    // 视图(如果render存在，template就会被忽视)
    render:creatFunction
    template:string

    // 方法
    methods:{}

    // 双向绑定数据
    data(){
        return {};
    },

    // 生命周期
    'created':callback,
    'beforeMount':callback,
    'mounted':callback,
    'beforeUpdate':callback, 
    'updated':callback,
    'beforeDestroy':callback, 
    'destroyed':callback,

    // 挂载局部指令或组件
    directive:{},
    component:{}

});
```

上面的属性除了el外都不是必须的。

创建一个组件也就意味着页面中的一个区域交由它来管理，是不是很简单，接着，我们来说说几个比较重要的点。

## render函数

上面的template表示字符串模板，最终会被解析成render，表示当前组件管理的视图，我们就来看看render是什么？

假如我们有一个template如下：

```html
<div>
    <label>iCrush</label>
    <p class='content'>一个渐进型的前端小框架</p>
</div>
```

转换成render函数以后就是：

```js
render:function(createElement){
    return createElement('div',{},[
        createElement('label',{},['iCrush']),
        createElement('p',{class:'content'},['一个渐进型的前端小框架'])
    ]);
}
```

另外，icrush-loader面对.iCrush文件会进行类似的处理，处理后的结果可以[参考这里](https://github.com/yelloxing/iCrush/tree/master/examples/render.js)。

## 自定义组件

template（或者说render）中可以包含组件来加强原生标签的功能，如何定义一个组件？

```js
iCrush.component('tagName',options);
```

其中options和new iCrush(options)是一致的，只不过el属性不需要传递了，使用的使用这样：

```html
<tag-name></tag-name>
  或
<tag-name />
```

这样定义的组件是全局的，如果你希望定义的组件只在当前组件中有效，可以这样挂载：

```js
new iCrush(
  ...
  component:{
      "tagName":option
  }
);
```

指令也遵循这样的挂载，更多细节请[查看这里](./directive.md)。

## 总结

iCrush不是对原生的取代，而是致力于强化原生标签的功能，提高代码的复用率和提高开发效率。

Copyright (c) 2020 走一步 再走一步 

[返回首页](./index.md)