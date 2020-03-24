export default function (iCrush) {

    // 挂载指令
    iCrush.directive = function (name, options) {

        /*
         [生命周期]
          1.inserted:指令生效的时候
          2.update:被绑定于元素所在的组件中有数据更新时调用，而无论绑定值是否变化
          3.delete:只调用一次，指令与元素解绑时调用
        */
        iCrush.prototype.__directiveLib[name] = options;

    };

    // 挂载组件
    iCrush.component = function (name, options) {

        iCrush.prototype.__componentLib[name] = options;

    };

    // 挂载过滤器
    iCrush.filter = function (name, options) {

        iCrush.prototype.__filterLib[name] = options;

    };

};