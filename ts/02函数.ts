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
function run1(): string {
    return '123'
}

function run2(): number {
    return 2213
}

// 匿名函数
var fun2 = function (): number {
    return 23
}


/*  2)  函数定义方法参数*/
function getInfo(name: string, age: number): string {
    return `${name} -- ${age}`
}
console.log(getInfo('张三', 22));

// 没有返回值
function run3(): void {
    console.log('run');
}

/*  3) 方法的可选参数 */

function getInfo1(name: string, age?: number): string {
    if (age) {
        return `${name} --- ${age}`
    } else {
        return `${name} -- 年龄保密`
    }
}
getInfo1('张三')

/*  4) 剩余参数 */
function sum(a: number, b: number, c: number): number {
    return a + b + c
}
console.log(sum(1, 2, 3));

// 拓展运算符
function sum1(...result: number[]): number {
    let sum = 0
    for (let index = 0; index < result.length; index++) {
        sum + result[index]
    }
    return sum
}
console.log(sum1(1, 2, 3, 4));


/*  5) 函数的重载 */
// java: 指有两个或多个同名函数,但他们的参数不一样,这是会出现函数重载的情况
// 通过同一个函数提供多个函数类型定义来试下多种功能的目的
// 为了兼容es5和es6重载的写法和java中有区别

// es5中出现同名方法,下面的会被替换 
// ts中的重载
// 参数不一样
function getInf(name:string):string ;
function getInf(age:number):number;
function getInf(str:any):any {
    if (typeof str === 'string') {
        return `我叫: ${str}`
    } else {
        return `我的年龄是 ${str}`
    }
}

console.log(getInf('张三'));
console.log(getInf(12));

// 参数一样

function getI(name: string):string;
function getI(name: string, age: number):string;
function getI(name: any, age?: any):any{
    if (age) {
        return `我叫:${name},我的年龄${age}`
    } else {
        return `我叫:${name}`
    }
}
console.log(getI('张三',123));

/*  6) 箭头函数 */
// this指向上下文
setTimeout(() => {
    
}, 100);
