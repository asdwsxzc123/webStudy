### ECMAScript5 Types
ECMAScript5 规范地址:
英文版：http://es5.github.io/#x15.1  
中文版：http://yanhaijing.com/es5/#115  

规范第八章讲到types:  
ECMAScript 的类型分为语言类型和规范类型.  
ECMAScript语言类型是开发者直接使用ECMAScript可以操作的.也就是我们说的数据类型Undefined,Null,Boolean,String,Number, 和Object.  

而规范类型相当于meta-values,是用来用算法描述ECMAScript语言结构和ECMAScript语言类型的.规范类型包括: Reference,List,Completion,Property Descriptor,Property Identifier,Lexical Environment, 和 Environment Record.  

ECMAScript规范的作用是用来描述语言底层行为逻辑.

### Reference
规范8.7讲到Reference
Reference类型是用来说明delete,typeof以及赋值运算符这些运算符的行为.  
> 引用(Reference)是一个已解决的命名绑定, 也就是'只存在于规范里的抽象类型',它们是为了更好的描述语言的底层行为才存在的,但并不存在于实际的js代码中.  
Reference的构成,由三部分组成,分别是:
* base value
* referenced name
* strict reference

可以这样理解:  
base value 就是所在的对象或者就是EnvironmentRecord,它的值只可能是undefined,an Object,a Boolean,a String,a Number, or an environment record其中一种.  
Reference name 就是属性的名称.  
举个例子:
```JavaScript
var foo = 1;
// 对应的Reference是:
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
}
```
再举个例子:
```JavaScript
var foo = {
  bar: function () {
    return this;
  }
}
foo.bar() // foo
//  bar对应的Reference是:
var BarReference = {
  base: foo,
  propertyName: 'bar',
  strict: false
}
```
而且规范中还提供获取Reference组成部分的方法,比如getBase和isPropertyReference. 
1. getBase
> GetBase(V). Returns the base value component of the reference V.
返回Reference的base value.
2. isPropertyReference
> IsPropertyReference(V). Returns true if either the base value is an object or HasPrimitiveBase(V) is true; otherwise returns false.
如果base value是一个对象,就返回true

### GetValue
8.7.1章规范中就讲了一个拥有从Reference类型获取对应值的方法:GetValue.  
简单模拟GetValue的使用:
```JavaScript
var foo = 1;
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
}
GetValue(fooReference) // 1
```
GetValue 返回对象属性真正的值,但是要注意:
调用GetValue,返回的将是具体的值,而不是一个Reference

### 如何确定this的值
规范11.2.3 函数调用:
这里讲了当函数调用的时候,如何确定this取值,只看1,6,7步
> 产生式CallExpression: MemberExpression Arguments按照下面的过程执行:  

> 1.令ref为解释执行MemberExpression的结果  

> 6.如果 Type(ref) 为 Reference，那么 如果 IsPropertyReference(ref) 为 true，那么 令 thisValue 为 GetBase(ref). 否则 , ref 的基值是一个环境记录项 令 thisValue 为调用 GetBase(ref) 的 ImplicitThisValue 具体方法的结果.  

> 7.否则 , 假如 Type(ref) 不是 Reference. 令 thisValue 为 undefined.

### 具体分析
1. 计算MemberExpression的结果赋值给ref  
什么是MemberExpression? 规范11.2提到:
MemberExpression:
* PrimaryExpression // 原始表达式 
* FunctionExpression    // 函数定义表达式
* MemberExpression [ Expression ] // 属性访问表达式
* MemberExpression . IdentifierName // 属性访问表达式
* new MemberExpression Arguments    // 对象创建表达式

举个例子:
```JavaScript
function foo() {
  console.log(this)
}
foo(); // MemberExpression 是foo
function foo() {
  return function() {
    console.log(this)
  }
}
foo()(); // MemberExpression 是foo()
var foo = {
  bar: function () {
    return this;
  }
}
foo.bar() // MemberExpression 是foo.bar
```
2. 判断ref 是不是一个reference类型. 
关键就在于看规范是如何处理各种MemberExpression, 返回的结果是不是一个Reference类型.  
举个例子:
```JavaScript
var value = 1;
var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}
// 示例1
console.log(foo.bar())
// 示例2
console.log((foo.bar)())
// 示例3
console.log((foo.bar = foo.bar)())
// 示例4
console.log((false || foo.bar)())
// 示例5
console.log((foo.bar, foo.bar)())
```
### foo.bar()
在示例1中,MemberExpression计算的结果是foo.bar,那么foo.bar是不是一个Reference呢?  
查看规范11.2.1  
> Return a value of type Reference whose base value is baseValue and whose referenced name is propertyNameString,and whose strict mode flag is strict.

我们得知该表达式返回一个Reference类型
```JavaScript
var Reference = {
  base: foo,
  name: 'bar',
  strict: false
}
```
接下来按照2.1的判断流程走:
> 2.1如果ref是Reference,并且ispropertyReference(ref)是true,那么this的值为getbase(ref) 

该值是Reference类型,那么ispropertyReference(ref)的结果是多少呢?  
前面我们已经铺垫了 ispropertyReference 方法,如果base value是一个对象,那么返回true.  
base value 为foo,是一个对象,所有ispropertyReference(ref)结果为true.  
这个时候我们就可以确定this的值了:
```JavaScript
this = GetBase(ref);
```
GetBase也可以铺垫了,获得base value值,这个例子中就是foo,所有this的值就是foo,示例1的结果就是2!

### (foo.bar)()
示例2:
```JavaScript
console.log((foo.bar)())
```
foo.bar被()包住,查看规范11.1.6 The Grouping Operator  
直接查看结果部分:
> Return the result of evaluating Expression. This may be of type Reference.

> NOTE This algorithm does not apply GetValue to the result of evaluating Expression.  

实际上()并没有对MemberExpression进行计算,所以与示例1的结果一样

### (foo.bar = foo.bar)()
示例3,有赋值操作符,查看规范 11.13.1 simple Assignment(=)  
> 3.Let rval be GetValue(rref).

因为使用了GetValue,所以返回的值不是reference类型.  
按照之前讲的判断逻辑:  
> 2.3如果ref不是reference,那么this的值为undefined.  

this 为 undefined

### (false || foo.bar)()
看示例4，逻辑与算法，查看规范 11.11 Binary Logical Operators：
> 2.Let lval be GetValue(lref).  

因为使用了GetValue,所以返回的值不是reference类型,this的值为undefined.  

### (foo.bar, foo.bar)()
看示例5，逗号操作符，查看规范11.14 Comma Operator ( , )

> 2.Call GetValue(lref).

因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined

注意:  
在非严格模式下,this 的值为 undefined 的时候，其值会被隐式转换为全局对象.因此3,4,5的值输出为1.

### 最后
冴羽的这篇文字看的我是一脸的懵逼,直接从范式的角度来讲this的指向,表示没看懂,这篇文章需要多看几遍.  
一般的博客讲到this的指向,都是从调用场景来讲的,this指向调用者
```javascript
var obj = {
  a: 1,
  b: function () {
    console.log(this);
  }
}
1、作为对象调用时，指向该对象 obj.b(); // 指向obj
2、作为函数调用, var b = obj.b; b(); // 指向全局window
3、作为构造函数调用 var b = new Fun(); // this指向当前实例对象
4、作为call与apply调用 obj.b.apply(object, []); // this指向当前的object
```