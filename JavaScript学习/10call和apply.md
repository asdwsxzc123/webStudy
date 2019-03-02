### call 
> call()方法在使用一个指定this值和若干个指定的参数值的前提下调用某个函数或方法

举个例子
```JavaScript
var foo = {
  value: 1
}
function bar () {
  console.log(this.value)
}
bar.call(foo) // 1
```
注意:
1. call改变了this的指向,指向到foo
2. bar函数执行了

### 模拟实现第一步
那么我们该怎么模拟实现这两个效果呢?  
试想当调用call的时候,吧foo对象改造成如下:
```JavaScript
var foo = {
  value: 1,
  bar: function () {
    console.log(this.value)
  }
}
foo.bar() // 1
```
这个时候this指向了foo,是不是很简单?呢
但是这样却给foo对象本身添加了一个属性,这可不行.  
不过也不用担心,我们用delete再删除它不就好了  
所有我们模拟的步骤可以分为:  
1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数
以上个例子为例,
```JavaScript
foo.fn = bar
foo.fn()
delete foo.fn
```
根据这个思路,我们可以尝试去写第一版的call2函数:
```JavaScript
Function.prototype.call2 = function (context) {
  context.fn = this
  context.fn()
  delete context.fn
}
var foo = {
  value: 1
}
function bar () {
  console.log(this.value)
}
bar.call2(foo)
```
### 模拟第二步
call函数还能给定参数执行函数
```JavaScript
var foo = {
  value: 1
}
function bar (name,age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}
bar.call(foo, 'kevin', 18)
```
注意: 传入的参数并不确定,要如何写?  
不急, 我们可以从arguments对象中取值,取出第二个到最后一个参数,然后放到一个数组中.  
```JavaScript
// arguments = {
//   0: foo,
//   1: 'kevin',
//   2: 18,
//   length: 3
// }
// 因为arguments是类数组对象,所有可以用for循环
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
  args.push('arguments[' + i + ']')
}
```
不定长的参数问题解决了,我们接着要把这个参数数组放到要执行的函数的参数里面去.
```JavaScript
// 将数组里的元素作为多个参数放进函数的形参里
context.fn(args.join(','))
```
这个样放肯定是不行的,我们需要用eval方法拼接成一个函数
```JavaScript
eval('context.fn('+args+')')
```
这里args会自动调用Array.toString()这个方法
```JavaScript
// 第二版
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args +')');
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
// kevin
// 18
// 1
```
### 模拟第三步
还需要注意两个小点:
1. this参数可以穿null,当为null的时候,指向window
```JavaScript
var value = 1;

function bar() {
    console.log(this.value);
}

bar.call(null); // 1
```
2. 函数可以有返回值
```JavaScript
var obj = {
    value: 1
}

function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call(obj, 'kevin', 18));
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```
这两点很好实现
```JavaScript 
Function.prototype.call2 = function (context) {
  var context = context || window
  context.fn = this
  var args = [];
  var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}
// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```
### apply的模拟
apply 的实现跟 call 类似
```JavaScript
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```