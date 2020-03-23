import iCrush from 'iCrush';

// 引入基础样式
import '@yelloxing/normalize.css';
import './styles/root.css';

// 引入请求方法
import remote from './service/$remote'; iCrush.use(remote);

// 引入主页面
import App from './App.iCrush';

// 根对象
window.icrush = new iCrush({

  //挂载点
  el: document.getElementById('root'),

  // 配置启动方法
  render: createElement => createElement(App),

  // render: function (createElement) {
  //   return createElement("div", {}, [
  //     createElement("label", {
  //       "for": "''"
  //     }, [
  //       createElement("测试"),
  //     ]),
  //     createElement("input", {
  //       "class": "'itc'",
  //       "id": "'itd'"
  //     }, []),
  //     createElement("文本"),
  //     createElement("ul", {}, [
  //       createElement("li", {}, [
  //         createElement("1"),
  //       ]),
  //       createElement("li", {}, [
  //         createElement("2"),
  //       ]),
  //       createElement("li", {}, [
  //         createElement("3"),
  //       ]),
  //     ]),
  //   ])
  // },

  created() {
    console.warn(this);
  }

});
