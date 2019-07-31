/*
 * vue2双向数据绑定原理
 */
class Vue {
  constructor(option) {
    // 给vue实例添加属性
    this.$el = option.el;
    this.$data = option.data;
    this.$method = option.method;
    // 数据劫持
    new Observer(this.$data);

    // 把data中所有的数据代理到了vm中
    this.proxy(this.$data);

    // 把method所有的方法代理到了vm中
    this.proxy(this.$method);

    // 如果存在元素就渲染
    if (this.$el) {
      new Compile(this.$el, this);
    }
  }

  // 代理
  proxy(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (data[key] === newValue) {
            return;
          }
          data[key] = newValue;
        }
      });
    });
  }
}
