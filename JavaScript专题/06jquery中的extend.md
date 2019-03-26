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

### target是函数
如果typeof 判断一个函数时,会返回function,我们无法再一个函数上进行拓展  
函数也是一种对象
```js
function a() {}

a.target = 'b';

console.log(a.target); // b
```
在underscore的实现中,各种方法是挂载在函数上的  
因此还需要判断是不是函数
```js
if (typeof target !== "object" && !isFunction(target)) {
    target = {};
}
```

### 类型不一致
来看一个小demo
```js
var obj1 = {
    a: 1,
    b: {
        c: 2
    }
}

var obj2 = {
    b: {
        c: [5],

    }
}

var d = extend(true, obj1, obj2)
console.log(d);
// {
//     a: 1,
//     b: {
//         c: {
//             0: 5
//         }
//     }
// }
```

第二遍执行到递归调用时：
```js
var src = 2;
var copy = [5];

target[name] = extend(true, src, copy);
```
第三遍进行最终的赋值，因为 src 是一个基本类型，我们默认使用一个空对象作为目标值，所以最终的结果就变成了对象的属性！

为了解决这个问题，我们需要对目标属性值和待复制对象的属性值进行判断：

判断目标属性值跟要复制的对象的属性值类型是否一致:

如果待复制对象属性值类型为数组，目标属性值类型不为数组的话，目标属性值就设为 []

如果待复制对象属性值类型为对象，目标属性值类型不为对象的话，目标属性值就设为 {}  

我们可以使用类型判断中的isPlainObject函数,对类型进行更细致的划分:
```js
var clone, copyIsArray;
...
if (isDeep && copy && (isPlainObject(copy)) || (copyIsArray = Array.isArray(copy))) {
  if (copyIsArray) {
    copyIsArray = false
    clone = src && Array.isArray(src) ? src : [];
  } else {
    clone = src && isPlainObject(src) ? src : {};
  }
  target[name] = extend(isDeep, clone, copy);
} else if (copy != undefined) {
  target[name] = copy;
}
```

### 循环引用
还有一个循环引用的问题,会无限展开:
```js
var a = {name : b};
var b = {name : a}
var c = extend(a, b);
console.log(c);
```
为了避免这个问题,我们需要判断要复制的对象是否等于target,如果等于,我们就跳过:
```js
...
scr = target[name];
copy = options[name];
if (target === copy) {
  continue;
}
..
```

### 最终版
```js
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
function isPlainObject(obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto,"constructor") && proto.constructor;
  return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
}

function extend() {
    // 默认不进行深拷贝
    var deep = false;
    var name, options, src, copy, clone, copyIsArray;
    var length = arguments.length;
    // 记录要复制的对象的下标
    var i = 1;
    // 第一个参数不传布尔值的情况下，target 默认是第一个参数
    var target = arguments[0] || {};
    // 如果第一个参数是布尔值，第二个参数是 target
    if (typeof target == 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    // 如果target不是对象，我们是无法进行复制的，所以设为 {}
    if (typeof target !== "object" && !isFunction(target)) {
        target = {};
    }

    // 循环遍历要复制的对象们
    for (; i < length; i++) {
        // 获取当前对象
        options = arguments[i];
        // 要求不能为空 避免 extend(a,,b) 这种情况
        if (options != null) {
            for (name in options) {
                // 目标属性值
                src = target[name];
                // 要复制的对象的属性值
                copy = options[name];

                // 解决循环引用
                if (target === copy) {
                    continue;
                }

                // 要递归的对象必须是 plainObject 或者数组
                if (deep && copy && (isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {
                    // 要复制的对象属性值类型需要与目标属性值相同
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    target[name] = extend(deep, clone, copy);

                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};
```
### 思考题
```js
// 如果觉得看明白了上面的代码，想想下面两个 demo 的结果：

var a = extend(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]);
console.log(a) // [1,2,3,7,8,9]

var obj1 = {
    value: {
        3: 1
    }
}

var obj2 = {
    value: [5, 6, 7],

}

// 这里有个陷阱,obj1的值已经发生了改变
var b = extend(true, obj1, obj2) // ??? value = [5,6,7]
// obj1={value: [5,6,7]}
var c = extend(true, obj2, obj1) // ??? value = [5,6,7]
```