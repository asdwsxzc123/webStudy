
/* 
负责解析模板内容
*/
class Compile {
    constructor(el, vm) {
        // el： vue实例传递的选择器
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        // vue实例
        this.vm = vm
        
        // 编译模板
        if (this.el) {
            //1. 防止重绘，回流，将el所有节点放入内存中,fragment(文档碎片)
            let fragment = this.node2fragment(this.el)
            // 2. 在内存中编译fragment
            this.compile(fragment)
            // 3.吧fragment一次添加到页面中
            this.el.appendChild(fragment)
        }
    }

    /* 核心方法 */
    node2fragment(node) {
        let fragment = document.createDocumentFragment()
        // 将el中所有的子节点挨个添加到文档碎片中
        let childNodes = node.childNodes;
        
        this.toArray(childNodes).forEach(node => {
            // 存入文档碎片,页面中没有元素了
            fragment.appendChild(node)
        })
        return fragment
    }

    /* 
        编译文档碎片(内存中)
    */
    compile(fragment) {
        let childNodes = fragment.childNodes
        this.toArray(childNodes).forEach(node => {
            // 元素节点
            if (this.isElementNode(node)) {
                // 解析元素节点
                this.compileElement(node)
            }
            // 文本节点
            if (this.isTextNode(node)) {
                // 解析文本节点
                this.compileText(node)
            }
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            } 
            
        })
    }

    compileElement(node) {
        // 拿到当前节点所有的属性 
        let attributes = node.attributes,
        _this = this
        this.toArray(attributes).forEach(attr => {
            // 解析指令('v-'开头)
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                let type = attrName.slice(2)
                let expr = attr.value
                
                // 事件指令
                if (this.isEventDirective(type)) {
                    ComplieUtil['eventHandler'] && ComplieUtil['eventHandler'](node, this.vm, type, expr)
                } else {
                    // 判断类型
                    ComplieUtil[type] && ComplieUtil[type](node, this.vm, expr)
                }
            }
        })
        
    }
    compileText(node) {
        ComplieUtil.mustache(node, this.vm)
    }


    /* 工具方法 */
    toArray(likeArray) {
        return [].slice.call(likeArray)
    }
    isElementNode(node) {
        // 1是元素 3文本
        return node.nodeType === 1
    }
    isTextNode(node) {
        // 1是元素 3文本
        return node.nodeType === 3
    }
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    isEventDirective(type) {
        return type.startsWith('on')
    } 
}

let ComplieUtil = {
    mustache (node, vm) {
        let txt = node.textContent
        let reg = /\{\{(.+)\}\}/
        if (reg.test(txt)) {
            let expr = RegExp.$1
            node.textContent = txt.replace(reg, ComplieUtil.getVMValue(vm, expr))
            window.watcher = new Watcher(vm, expr, (newValue) => {
                node.textContent = newValue
            })
        }
    },
    // 处理文本解析
    text(node, vm, expr) {
        node.textContent = this.getVMValue(vm, expr)
        // 通过watcher对象,监听expr的数据变化,一点变化,执行回调函数
        new Watcher(vm, expr, (newValue) => {
            node.textContent = newValue
        })
    },
    html(node, vm, expr) {
        node.innerHTML = this.getVMValue(vm, expr)
        new Watcher(vm, expr, (newValue) => {
            node.innerHTML = newValue
        })
    },
    model(node, vm, expr) {
        let _this = this
        node.value = this.getVMValue(vm, expr)
        node.addEventListener('input', function () {
            _this.setVMValue(vm, expr, this.value)
        })
        new Watcher(vm, expr, (newValue) => {
            node.value = newValue
        })
    },
    eventHandler(node, vm, type, expr) {
        // 给当前节点绑定事件
        let eventType = type.split(':')[1]
        let fn = vm.$method && vm.$method[expr]
        if (fn) {
            node.addEventListener(eventType, fn.bind(vm))
        }
    },
    // 用于获取VM中的数据
    getVMValue(vm, expr) {
        let data = vm.$data
        expr.split('.').forEach(key =>{
            data = data[key]
        })
        return data
    },

    setVMValue(vm,expr,value) {
        let data = vm.$data,
        arr = expr.split('.');
        arr.forEach((key, index) => {
            // 如果index是最后一个,直接设置值
            if (index < arr.length -1) {
                data = data[key]
            } else {
                data[key] = value
            }
        })
    }
}

