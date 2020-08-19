import iCrush from 'icrush';

// 引入基础样式
import '@yelloxing/normalize.css';
import './styles/root.css';

// 引入主页面
import App from './App.iCrush';

// 根对象
window.icrush = new iCrush({

  //挂载点
  el: document.getElementById('root'),

  // 配置启动方法
  render: createElement => createElement(App)

});