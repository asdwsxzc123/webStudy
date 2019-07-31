/* 
需要使用发布-订阅者模式(观察者模式)
它定义了一种一对多的依赖关系,当一个对象的状态改变时,所有依赖于它的对象都会得到通知,病自动更新,解决了主体对象与观察者之间功能的耦合
优点:解耦合,订阅者不需要每次去轮询遍历是否有新消息,发布者不需要关系谁订阅它,只需要给所有订阅者发布

*/


class Watcher {
    /**
     * vm: vue实例
     * expr: data中数据的名称
     * cb 回调
     */
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb

        // this表示创建的watcher对象
        Dep.target = this

        // 存储旧的值
        this.oldValue = this.getVMValue(this.vm, this.expr)
        Dep.target = null
    }

    // 对外暴露的方法,用于更新数据
    update() {
        // 对比expr是否发生了改变,如果改变,调用cb
        let oldValue = this.oldValue
        let newValue = this.getVMValue(this.vm, this.expr)
        if (oldValue !== newValue) {
            this.cb(newValue, oldValue)
        }
    }

    // 用于获取VM中的数据
    getVMValue(vm, expr) {
        let data = vm.$data
        expr.split('.').forEach(key => {
            data = data[key]
        })
        return data

    }
}


/* dep对象用于管理所有的订阅者通知订阅者 */
class Dep{
    constructor(){
        // 用于管理订阅者
        this.subs = []
    }

    // 添加订阅者
    addSub(Watcher) {
        this.subs.push(Watcher)
    }
    // 通知
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        });
    }
}