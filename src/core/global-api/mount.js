export default function (iCrush) {

    // 挂载指令
    iCrush.directive = function (name, options) {

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