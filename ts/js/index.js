"use strict";
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
/* ts需要指定类型
    // 错误方式
    var flag = true
    flag = 123
*/
/* 1) boolean */
// var flag:boolean = true
// flag = false
/* 2)  number */
// var num:number = 123
// num = 123
// 3)  数组有两种定义方式 array tuple
// var arr = [1,2] // es5
// 1. 第一种
// var arr1:number[] = [11,22,33]
// 2. 第二种
// var arr2:Array<number> = [11,22,33]
// 3. 第三种
var arr2 = [11, 22, 33];
// 4) 元组类型 (tuple) ,给每一个位置指定类型
// let  arr:[number,string] = [123,'222']
/* 5)  枚举类型 enum
enun 枚举名{
    标识符[=整形常数],
    标识符[=整形常数],
    标识符[=整形常数]
}
*/
// enum Flag { success=1, error=2 }
// let s:Flag = Flag.success
// console.log(s);
// enum Color {red, blue, 'orange'}
// var c:Color = Color.red
// console.log(c);
// enum Err {'undefined'=-1,'null' =-2, 'success'=1}
// var e:Err = Err.null
// console.log(e);
/*  6) any 任意类型 */
// var num:any = 123
// num = 'str'
// num = true
// var oBox:any = document.getElementById('box')
// oBox.style.color = 'red'
/*  7) null 和undefined 其他(never类型)数据类型的子类型 */
// 错误写法
// var num:number
// console.log(num); // undefined
// 错误写法
// var num:undefined
// console.log(num); // undefined
// var num:number |string| undefined 
// num = 1
// num = 'se'
// console.log(num); // undefined
// 错误写法
// var num:null
// console.log(num); // undefined
// 一个元素可能是number类型 可能是null 可能是undefined
// var num:null|undefined|number
// num = 124
// console.log(num);
/*  8) void类型 表示没有任何类型,一般用来定义方法的时候,方法没有返回值 */
// function run () {
//     console.log('run');
// }
// run()
// 表示方法没有返回任何类型
// function run ():void {
//     console.log('run');
// }
// run()
// 错误写法
// function run ():undefined {
//     console.log('run');
// }
// run()
// function run ():number {
//     return 123
// }
// run()
/*  8)  never 其他类型(包括null和undefined)的子类型,表示从不会出现的值
    never声明只能被never类型所复制
*/
// var  b:null
// b=null
// console.log(b);
// var a:never;
// a = (()=> {
//     throw new Error('做完')
// })()
/*  9)  */ 
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
/* 函数 */
/*  1)  函数定义 */
// 函数声明式
function run1() {
    return '123';
}
function run2() {
    return 2213;
}
// 匿名函数
var fun2 = function () {
    return 23;
};
/*  2)  函数定义方法参数*/
function getInfo(name, age) {
    return name + " -- " + age;
}
console.log(getInfo('张三', 22));
// 没有返回值
function run3() {
    console.log('run');
}
/*  3) 方法的可选参数 */
function getInfo1(name, age) {
    if (age) {
        return name + " --- " + age;
    }
    else {
        return name + " -- \u5E74\u9F84\u4FDD\u5BC6";
    }
}
getInfo1('张三');
/*  4) 剩余参数 */
function sum(a, b, c) {
    return a + b + c;
}
console.log(sum(1, 2, 3));
// 拓展运算符
function sum1() {
    var result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        result[_i] = arguments[_i];
    }
    var sum = 0;
    for (var index = 0; index < result.length; index++) {
        sum + result[index];
    }
    return sum;
}
console.log(sum1(1, 2, 3, 4));
function getInf(str) {
    if (typeof str === 'string') {
        return "\u6211\u53EB: " + str;
    }
    else {
        return "\u6211\u7684\u5E74\u9F84\u662F " + str;
    }
}
console.log(getInf('张三'));
console.log(getInf(12));
function getI(name, age) {
    if (age) {
        return "\u6211\u53EB:" + name + ",\u6211\u7684\u5E74\u9F84" + age;
    }
    else {
        return "\u6211\u53EB:" + name;
    }
}
console.log(getI('张三', 123));
/*  6) 箭头函数 */
// this指向上下文
setTimeout(function () {
}, 100);
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
/* 接口的作用: 在面向对象的编程中,接口是一种规范定义,他定义了行为和动作的规范,接口起到一种限制和规范的作用,接口定义了某一批类所需要遵循的规范,接口不关心类的内部状态数据,也不关心实现的细节,只是批准这些类必须提供默写方法,提供这些方法的类就可以满足需求,ts接口类似于java,接口类型:属性,函数,可索引,类  */
var Web = /** @class */ (function () {
    function Web(name) {
        this.name = name;
    }
    Web.prototype.eat = function () {
    };
    Web.prototype.work = function () {
    };
    return Web;
}());
/*
泛型： 在软件工程中，我们不仅要创建一致的定义良好的API,同时也要考虑可重用性，组件不仅可以支持当前的数据类型，也要支持未来的数据类型，
解决 类，接口，方法的复用性，以及对不特定数据类型的支持
*/
// 泛型： 可以支持不特定的数据类型，
function getData(value) {
    return value;
}
getData(123);
getData('123');
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.list = [];
    }
    MinClass.prototype.add = function (num) {
        this.list.push(num);
    };
    MinClass.prototype.min = function () {
        var minNum = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            if (minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum;
    };
    return MinClass;
}());
var m = new MinClass();
m.add(1);
m.add(2);
m.add(3);
console.log(m.min());
