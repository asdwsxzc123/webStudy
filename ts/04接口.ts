/* 接口的作用: 在面向对象的编程中,接口是一种规范定义,他定义了行为和动作的规范,接口起到一种限制和规范的作用,接口定义了某一批类所需要遵循的规范,接口不关心类的内部状态数据,也不关心实现的细节,只是批准这些类必须提供默写方法,提供这些方法的类就可以满足需求,ts接口类似于java,接口类型:属性,函数,可索引,类  */

/* 1) 属性接口 */

// ts定义方法
/* function printLabel():void {
    console.log('printLabel');
} */

/* ts自定义方法传入参数对json进行约束 
    function printLabel(labelInfo:{label:string}):void{
        console.log('printLabel');
    }
    printLabel({label:'11'})
*/

// 对传入批量方法进行约束
/* interface FullName {
    firstName:string;
    secondName?:string; // 接口的可选属性
}
function printName(name: FullName) {
    console.log(name.firstName,name.secondName);
}
printName({ firstName: 'li', secondName: 'si'}) */

// 例子
/* interface Config {
    type: string;
    url: string;
    data?: string;
    dataType: string;
}
function ajax(config:Config) {
    var xhr = new XMLHttpRequest()
    xhr.open(config.dataType, config.url, true)
    xhr.send(config.data)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success');
            if (config.dataType === 'json') {
                JSON.parse(xhr.responseText)
            } else {
                console.log(xhr.responseText);
                
            }
        }
    }
    
}
ajax({
    url: 'http://www.baidu.com',
    type: 'get',
    dataType: 'json',

}) */


//2) 函数型接口： 对方法传入的参数 以及返回值进行约束

//  加密的函数类型接口
/* interface enctrypt {
    (key: string, value: string): string;
}
var md5: enctrypt = (key: string, value: string): string => {
    // 模拟操作
    return key + value
}
var sha1:enctrypt = function (key:string,value:string):string{
    return key + value
} */

// 3) 可索引接口： 数字和对象的约束
// var arr:number[] = [213,213]
// var arr1:Array<string> = ['11','22']
/* interface UserArr {
    [index:number]:string;
}

var arr:UserArr = ['123','123']
interface UserObj {
    [index:string]:string;
}

var obj:UserObj = {
    'name': 'name',
    'age': '12'
} */


// 4) 类类型接口： 对类的约束
/* interface Animal{
    name:string;
    eat(str:string):void;
}

class Dog implements Animal {
    name:string;
    constructor(name:string){
        this.name = name
    }
    eat(str:string){
        console.log(str);
        
    }
}
 */
// 5) 接口拓展：接口可以继承

interface Animal{
    eat():void;
}
interface Person extends Animal{
    work():void;
}
class Web implements Person{
    name:string;
    constructor(name:string) {
        this.name = name
    }
    eat() {
        
    }
    work() {

    }
}
