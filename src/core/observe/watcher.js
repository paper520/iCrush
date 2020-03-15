/**
 * =========================================
 * 通过proxy的方式，对this.data中的数据进行拦截
 */

import get from '@yelloxing/core.js/get';

export default function (_this) {

  for (let key in _this.data) {
    let value = get(_this.data, key);

    // 针对data进行拦截，后续对data的数据添加不会自动监听了
    Object.defineProperty(_this.data, key, {
      get() {
        return value;
      },
      set(newValue) {
        _this._lifecycle('beforeUpdate');

        value = newValue;

        // 数据改变，触发更新
        _this._updateComponent();

        _this._lifecycle('updated');
      }
    });
  }

};