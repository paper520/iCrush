export default {
  props: ['is'],
  data() {
    return {
      is: null
    };
  },
  lister(iCrush) {

    // 如果动态组件没有改变
    if (this._prop.is == this.is) return;

    let oldComponent = this._oldComponent;
    if (oldComponent) oldComponent.$$lifecycle("beforeDestroy");

    this.is = this._prop.is;

    let options = this._prop.is;
    options.el = this._el;

    // 标记替换而不是追加
    options.el._nodeName = 'I-CRUSH-COMPONENT';

    // 重定向挂载点
    this._oldComponent = new iCrush(options);
    this._el = this._oldComponent._el;

    if (oldComponent) {
      oldComponent.$$lifecycle("destroyed");
      oldComponent = null;
    }
  }
};