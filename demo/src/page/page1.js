export default {

  /**
   * 启动模板
   * ==================
   */
  // template: `<div>来自template</div>`,
  render(createElement) {
    return createElement('div', {}, [
      createElement('h2', {}, "来自render函数"),
      createElement('hr'),
      createElement('p', {}, "启动方式有二种，template或render,你可以试着注释掉render看看效果！"),
      createElement('a', {
        "href": "javascript:void(0)",
        "@click": "doIt"
      }, '点击我试试')
    ]);
  },

  /**
   * 数据和方法
   * =================
   */
  data() {
    return {
      "message": "来自data的数据"
    };
  },
  methods: {
    doIt() {
      alert(this.data.message);
    }
  },

  /**
   * 生命周期钩子
   * =====================
   */
  beforeCreate() {
    console.warn('创建前');
  },
  created() {
    console.warn('创建成功');
  },
  beforeMount() {
    console.warn('挂载到页面前');
  },
  mounted() {
    console.warn('挂载完成');
  },
  beforeUpdate() {
    console.warn('数据改变，更新前');
  },
  updated() {
    console.warn('数据改变，更新完成');
  },
  beforeDestroy() {
    console.warn('销毁前');
  },
  destroyed() {
    console.warn('销毁完成');
  }
};