/* 
给data中所有的数据添加getter 和 setter
*/
class Observer{
    constructor(data) {
        this.data = data
        this.walk(this.data)
    }

    /* 核心方法 */
    /**
     * 遍历data中所有的数据,添加getter和setter
     */
    walk(data) {
        if (!data || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach(key => {
            // 劫持
           this.defineReactive(data,key,data[key])
           this.walk(data[key])
        })
        
    }
    // 定义响应式数据劫持
    // data中每一数据都应该维护一个dep对象
    // dep保存了所有的订阅了该数据的订阅者
    defineReactive(obj,key,value) {
        let _this = this
        let dep = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 如果Dep.target中有watcher对象,存储到订阅者数组中
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if (value === newValue) {
                    return
                }
                value = newValue
                _this.walk(newValue)
                // 数据更新了,调用watcher的update方法
                // window.watcher.update()

                // 让所有的订阅者,收到通知
                dep.notify()
            }
        })
    }
}