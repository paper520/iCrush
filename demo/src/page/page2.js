export default {
  template: `<div>

    <h4>数据绑定</h4>
    <hr /><br />

    <strong>【单向绑定】</strong>
    <br />
    <label>firstName:</label>
    <span>{{data.firstName}}</span> 
    <br /> 
    <label>lastName:</label>
    <span v-bind='data.lastName'></span> 
    <br /> <br />

    <strong>【双向绑定】</strong>
    <br />
    <label>firstName:</label><input v-model='data.firstName'/>
    <br />
    <label>lastName:</label><input v-model='data.lastName'/>

    <!--============================================================================-->
    <br /><br /><br />

    <h4>结点事件</h4>
    <hr /><br />

    <input type='button' value='点击' @click='doIt("点击")'>
    <input type='button' value='鼠标经过' @mouseover='doIt("鼠标经过")'>
    <input type='button' value='双击' @dblclick='doIt("双击")'>

    <!--============================================================================-->
    <br /><br /><br />

    <h4>v-bind扩展</h4>
    <hr /><br />

    <span v-bind:firstName='data.firstName'>请用F12查看运行后的DOM属性</span>

    <!--============================================================================-->
    <br /><br /><br />

    <h4>扩展说明</h4>
    <hr /><br />

    <p>
      除此之外，你还可以自定义组件或指令等！
    </p>

  </div>`,
  data() {
    return {
      firstName: "心",
      lastName: "叶"
    };
  },
  methods: {
    doIt(info) {
      alert(info);
    }
  }
};