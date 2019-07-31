/* 
泛型： 在软件工程中，我们不仅要创建一致的定义良好的API,同时也要考虑可重用性，组件不仅可以支持当前的数据类型，也要支持未来的数据类型，
解决 类，接口，方法的复用性，以及对不特定数据类型的支持
*/

// 泛型： 可以支持不特定的数据类型，
function getData<T>(value:T):T{
    return value
}
getData<number>(123)
getData<string>('123')

class MinClass{
    public list:number[] = []
    add(num:number){
        this.list.push(num)
    }
    min():number {
        var minNum = this.list[0]
        for(var i = 0; i<this.list.length;i++) {
            if (minNum>this.list[i]) {
                minNum = this.list[i]
            }
        }
        return minNum
    }
}

var m = new MinClass()
m.add(1)
m.add(2)
m.add(3)
console.log(m.min());
