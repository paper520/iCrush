/**
 * =========================================
 * 挂载全局指令，组件等全局方法
 */
export default function (iCrush) {

  iCrush.prototype.$directive = {};
  // 挂载全局指令方法
  // 指令options可配置项有：
  //    1.inserted（关联的结点插入页面触发）
  //    2.update（数据改变更新触发）
  iCrush.directive = function (name, options) {
    if (iCrush.prototype.$directive[name]) {
      throw new Error('The directive has already been defined:v-' + name);
    }
    iCrush.prototype.$directive[name] = options;
  };

  iCrush.prototype.$component = {};
  // 挂载全局组件方法
  // 组件options可配置项等情况和iCrush对象一致
  iCrush.component = function (name, options) {
    if (iCrush.prototype.$component[name]) {
      throw new Error('The component has already been defined:ui-' + name);
    }
    iCrush.prototype.$component[name] = options;
  };

  // 创建组件方法
  iCrush.prototype._new = function (options) {
    return new iCrush(options);
  };

};