import { bindEvent } from '../../helper';

export default {
  inserted: function (el, binding) {

    let types = binding.type.split('.');

    bindEvent(el, types[0], function () {

      alert('test');

    });
  }
};