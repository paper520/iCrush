export default {
  props: ['is'],
  data() {
    return {};
  },
  lister(iCrush) {
    let options = this._prop.is;
    options.el = this._el;

    // 标记替换而不是追加
    options.el._nodeName = 'I-CRUSH-COMPONENT';

    // 重定向挂载点
    this._el = new iCrush(options)._el;
  }
};