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
var arr2:any = [11, 22, 33]

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