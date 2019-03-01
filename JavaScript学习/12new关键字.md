### new
> new运算符创建了一个用户定义的对象或具有构造函数的内置对象类型之一

也许有点难懂,我们来看看new实现了哪些功能
```JavaScript
// Otaku 御宅族
function Otaku (name, age) {
  this.name = name
  this.age = age
  this.habit = 'Games';
}
// 因为缺乏锻炼,身体强度堪忧
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
  console.log('i am ' + this.name)
}
var person = new Otaku('Kevin', '18')
console.log(person.name) // Kevin
console.log(person.age) // 18
console.log(person.strength) // 60
person.sayYourName() // i am  Kevin
```
从上面的例子可以看出,实例person可以:
1. 访问到Otaku构造函数里的属性
2. 访问到Otaku.prototype的属性  
因为new是关键字,所以无法向bind一样直接覆盖,所以需要写一个函数,命名为objectfactory,来模拟new的效果
```JavaScript
function Otaku() {}
// 使用new创建
var person = new Otaku()
// 使用 objectFactory
var person = objectFactory(Otaku)
```

### 初步实现
分析:
因为new的结果是一个新的对象,所以在模拟实现的时候,我们也需要创建一个新对象,假设这个对象叫做obj,因为obj会具有Otaku构造函数里的属性,使用经典继承,我们可以使用Otaku.apply(obj,arguments)来个obj添加新的属性.  
根据原型和原型链的知识,我们知道实例的__proto__属性会指向构造函数的prototype,也正是因为建立起这样的关系,实例可以访问原型上的属性.  
```JavaScript
// 第一版代码
function objectFactory() {
  var obj = new Object();
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
}
```
在这一版中,我们:  
1. 使用new Object()的方式创建了一个新的对象obj
2. 取出第一参数,就是我们要传入的构造函数.此外因为shift会修改原数组,所有arguments会被去除第一个参数
3. 将obj的原型指向构造函数,这样obj就可以访问到构造函数原型中的属性
4. 使用apply,改变构造函数this的指向到新建的对象,这样obj就可以访问到构造函数中的属性
5. 返回obj

### 返回值效果实现
如果构造函数有返回值
```JavaScript
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined 
```

在这个例子中,构造函数返回了一个对象,在实例person中只能访问返回的对象中的属性.
而且还需要注意一点,如果返回的是基本数据类型的值呢.
```JavaScript
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return 'handsome boy';
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18
```
结果完全颠倒了,这次尽管有返回值,但是相当于没有返回值处理.  
所以我们还需要判断返回值是不是一个对象,如果是一个对象,我们就返回这个对象,如果没有,我们该返回什么就返回什么.  
我们再来看第二版
```JavaScript
function objectFactory() {
  var obj = new Object(); // 创建一个新对象
  Constructor = [].shift.call(arguments); // 构造函数获取所有的参数,除了第一个
  obj.__proto__ = Constructor.prototype; // 构造函数的protoype等于实例的__proto__
  var ret = Constructor.apply(obj, arguments); // 执行构造函数,获取返回值
  return typeof ret === 'object' ? ret||obj : obj 
}
```
