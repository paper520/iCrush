import xhtml from 'xhtml.js';

export default {
  inserted: function (el, binding) {

    let types = binding.type.split('.');

    xhtml(el).bind(types[0], function () {
      alert('test');
    });
  },
  delete: function (el, binding) {

    console.log(el, binding);

  }
};