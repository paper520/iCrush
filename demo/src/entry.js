import iCrush from 'iCrush';

// 引入基础样式
import '@yelloxing/normalize.css';
import './styles/root.scss';

// 引入主页面
import './page/App';

// 添加水印(懒加载)
let watermark = resolve => require(['./service/watermark'], resolve);
new Promise(resolve => watermark(resolve)).then(callback => callback.default("iCrush 用例"));

//根对象
window.vm = new iCrush({

  //挂载点
  el: document.getElementById('root'),

  // 配置启动方法
  render: createElement => createElement('ui-app'),

});
