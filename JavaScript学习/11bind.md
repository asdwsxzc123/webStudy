### bind
> bind()方法会创建一个新函数.当这个新函数被调用时,bind()的第一个参数将作为它运行时的this,之后的一序列参数将会在传递的实参前传入作为它的参数.(来自MDN)

由此我们可以首先得到bind函数的两个特点:  
1. 返回一个函数
2. 可以传入参数
### 返回函数的模拟实现
```JavaScript
var foo = {
  value: 1
}
function bar(){
  console.log(this.value)
}
// 返回一个函数
var bindFoo = bar.bind(foo)
bindFoo()  // 1
```
关于指定this的指向,我们可以使用call或者apply实现,关于call和apply的模拟实现,前面一讲已经讲过
```JavaScript
Function.prototype.bind2 = function (context) {
  var self = this
  return function () {
    return self.apply(context)
  }
}
```
之所以return self.apply(context), 是考虑到绑定函数可能是有返回值的
```JavaScript
var foo = {
  value: 1
}
function bar() {
  return this.value;
}
var bindFoo = bar.bind(foo);
console.log(bindFoo())
```
### 传参的模拟实现
接下来看第二点,可以传入参数. 这个就有点让人费解了.我在bind的时候,是否可以传参? 我咋执行bind返回的函数的时候,可以不可以传参呢?让我们看个例子
```JavaScript
var foo = {
  value: 1
}
function bar(name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age)
}7
var bindFoo = bar.bind(foo, 'daisy')
bindFoo('18') 
// 1
// daisy
// 18
```
函数需要传name和age两个参数,竟然可以在bind的时候,只传一个name,在执行返回的函数的时候,再传另一个参数age!
我们用arguments进行处理
```JavaScript
Function.prototype.bind2 = function (context) {
  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1)
  return function () {
    // 这时的arguments是指bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(context,arugs.concat(bindArgs))
  }
}
```
### 构造函数效果模拟实现
完成这两点,最难的部分到了.bind还有一个特点,就是
> 一个绑定函数也能使用new操作符创建对象: 这种行为看就像吧原函数当成构造器,提供this的值被忽略,同时调用时的参数被提供给模拟函数.

也就是说当bind返回的函数作为构造函数的时候,bind时指定的this值会失效,但传入的参数依然生效
```JavaScript
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin 
```
注意: 尽管在全局和foo中都声明了value值,最后依然返回了undefined,说明绑定的this失效,如果大家了解new的模拟实现,就会知道这个时候的this意见指向了obj.  
所以我们可以通过修改返回的函数的原型来实现,让我们写一下:
```JavaScript
Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时,this指向实例,此时结果为true,将绑定函数的this指向该实例,可以让实例获得来自绑定函数的值.
    // 以上面的是demo为例,如果改成'this instanceOf fBound ? null : context'. 实例只是一个空对象,将null改成this,实例会具有habit属性
    // 当做为普通函数时,this指向window,此时结果为false,将绑定函数的this指向Context
    return self.apply(this instanceof fBound ? this : context,args.concat(bindArgs))
  }
  // 修改返回函数的prototype 为绑定函数的prototype,实例就可以继承绑定函数的原型中的值
  fBound.prototype = this.prototype
  return fBound;
}
```

### 构造函数效果的优化实现
在这个写法中,我们将fBound.prototype = this.prototype,我们直接修改fBound.prototype的时候,也会直接修改绑定函数的prototype.这个时候,我们可以通过一个空函数来进行中转:
```JavaScript
Function.prototype.bind2 = function (context) {
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function () { }
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound;
}
```
### 两个问题
1. 调用bind的不是函数怎么办?
```JavaScript
// 来源MDN https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
```
2. 要在线上用
需要做个判断
```JavaScript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(context) {...}
}
```

### 最终代码
```JavaScript
Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```