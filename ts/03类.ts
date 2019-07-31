/* 
boolean
number 
string 
array
tuple
enum
any
null
undefined
void
never
*/
// 静态属性,静态方法
/* 
    function Person() {
        this.run = function () {} // 实例方法
    }
    Person.run = function () { } // 静态方法 
    let p = new Person()
    p.run() //实例方法调用
    Person.run() //静态方法的调用


    function $(element) {
        // 实例方法
        return new Base(element)
    }
    // 静态方法
    $.get = function (url, function () {
    
    })
    function Base (element) {
        this.element = element
        this.css = (attr, value) => {
            this.element.style.attr = value
        }
    }
    
    
    $('#box').css('color', 'red')
    $.get('url', () => {
    
    })
*/

// class Person {
//     public name:string
//     constructor(name:string) {
//         this.name = name
//     }
//     static sex:string = '男'
//     run() { // 实例方法
//         console.log(`${this.name} 在运动`);
        
//     }
//     work() {
//         console.log(`${this.name} 在工作`);
//     }
//     static print () { // 静态方法
//         // 静态方法没法调用类里面的属性
//         console.log(`性别:${Person.sex}`);
//     }
// }
// Person.print()

/* 多态 */
// 父类定义一个方法不去实现,让继承它的子类去实现 每一个子类有不同的表现
// 多态属于继承

// class Animal {
//     name:string;
//     constructor(name: string) {
//         this.name = name
//     }
//     eat() { //具体吃什么不去实现, 具体吃什么,让他的子类去实现
//         console.log('吃的方法');
        
//     }
// }
// class Dog extends Animal {
//     constructor(name:string) {
//         super(name)
//     }
//     eat() {
//         return `${this.name}在吃肉`
//     }
// }
// class Cat extends Animal {
//     constructor(name:string) {
//         super(name)
//     }
//     eat() {
//         return `${this.name}在吃老鼠`
//     }
// }

// ts中的抽象类:他是提供其他类继承的基类,不能直接被实例化
// 用abstract 关键字定义抽象类和抽象方法,抽象类中的抽象
// 抽象方法只能放在抽象类里面,要求他的子类必须保安抽象类方法
/* abstract class Animal {
    public name:string;
    constructor(name:string) {
        this.name = name
    }
    abstract eat():any

}

class Dog extends Animal{
    constructor(name:any) {
        super(name)
    }
    eat() {
        console.log(this.name + '吃粮食');
    }
}
let d = new Dog('小狗')
d.eat() */

// ts定义类
/* class Person{
    name:string //属性 省略了public关键字
    constructor(n:string) {
        this.name = n
    }
    run():void{
        console.log(this.name);
    }
    getName():string {
        return this.name
        
    }
    setName(n:string):void {
        this.name = n
    }
}
var p = new Person('张三')
console.log(p.getName());
p.setName('李四')
console.log(p.getName());
 */

// ts实现继承
/* 
class Person{
    name:string
    constructor(name:string) {
        this.name = name
    }
    run():string {
        return `${this.name}在运动`
    }
}

class Web extends Person {
    constructor(name:string) { // 初始化父类的构造函数
        super(name)
    }
    work() {

    }
}
var w = new Web('李四')
w.run()
 */

/* 3类修饰符 
public: 公有 在类里面 子类 类外面都可以访问,默认公有
protected: 保护类型 在类和子类里面都可以访问,类外面无法访问
private: 私有 只能在自己的类里面可以访问,子类和类外面无法访问
*/
// 保护类型
/* class Person {
    public  name: string
    protected  name: string
    private  name: string
    constructor(name: string) {
        this.name = name
    }
    run(): string {
        return `${this.name}在运动`
    }
}

class Web extends Person {
    constructor(name: string) { // 初始化父类的构造函数
        super(name)
    }
    work() {

    }
}
var w = new Web('李四')
w.run() */