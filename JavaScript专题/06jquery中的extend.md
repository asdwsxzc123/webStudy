### extend基本用法
引用jquery官网
>Merge the contents of two or more objects together into the first object.  

可以合并两个或更多的对象内容到第一个对象中.  
源码v1.12: 
https://github.com/jquery/jquery/blob/1.12-stable/src/data.js#L280
```js
jQuery.extend( target [, object1 ] [, objectN ] )

var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
};

var obj2 = {
    b: { b1: 3, b3: 4 },
    c: 3
};

var obj3 = {
    d: 4
}

console.log($.extend(obj1, obj2, obj3));

// {
//    a: 1,
//    b: { b1: 3, b3: 4 },
//    c: 3,
//    d: 4
// }
```
当两个对象出现相同的字段时,后者会覆盖前者,而不会进行深层次的覆盖

### 第一版
结合之前的深浅拷贝来写,这一版来实现了浅拷贝
```js
var extend = function () {
  var name, options, copy;
  var length = arguments.length;
  var target = arguments[0];
  for (var i = 1; i < length; i++) {
    options = arguments[i];
    if (options != null) {
      for (name in options) {
        copy = options[name];
        if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}
```

### extend深拷贝
如果进行深层次的复制呢?v1.1.4加入了新方法
```js
jQuery.extend( [deep], target, object1 [, objectN ] )
```
函数的第一个参数可以传入一个布尔值,如果是true,进行省考吧,false依然是浅拷贝
```js
var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
};

var obj2 = {
    b: { b1: 3, b3: 4 },
    c: 3
};

var obj3 = {
    d: 4
}

console.log($.extend(true, obj1, obj2, obj3));

// {
//    a: 1,
//    b: { b1: 3, b2: 2, b3: 4 },
//    c: 3,
//    d: 4
// }
```

### 第二版
我们来实现深拷贝的功能,需要注意:  
1. 需要根据第一个参数的类型,来确定target和要合并对象的下标确实值.
2. 如果是深拷贝,需要根据copy的类型递归extend
```js
var extend = function () {
  // 默认不进行深拷贝
  var length = arguments.length
  var isDeep = false;
  var name, options, src, copy;
  // 记录要复制的下标
  var i = 1;
  // 第一参数不传布尔值的情况下,target默认是第一个参数
  var target = arguments[0] || {}
  // 如果第一参数是布尔值,第二个参数才是target
  if (typeof target === 'boolean') {
    isDeep = target;
    target = arguments[1] || {};
    i++;
  }
  // 如果target不是对象,我们无法复制,所以设为{}
  if (typeof target !== 'object') {
    target = {}
  }
  for (; i < length; i++) {
    options = arguments[i];
    // 要求不能为空,避免extend(a,b)这种情况
    if (options != null) {
      for (name in options) {
        // 目标属性值
        src = target[name];
        // 要复制的对象的属性值
        copy = options[name];
        if (isDeep && copy && typeof copy === 'object') {
          // 递归调用
          target[name] = extend(isDeep, src, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
    
  }
  return target
}
```
