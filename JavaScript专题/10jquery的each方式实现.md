### each介绍
```js
jQuery.each(object, [callback])
```
回调函数拥有两个参数,第一个为对象的成员或数字的索引,第二个对应变量或者内容.
```js
// 遍历数组
$.each( [0,1,2], function(i, n){
    console.log( "Item #" + i + ": " + n );
});

// Item #0: 0
// Item #1: 1
// Item #2: 2

// 遍历对象
$.each({ name: "John", lang: "JS" }, function(i, n) {
    console.log("Name: " + i + ", Value: " + n);
});
// Name: name, Value: John
// Name: lang, Value: JS
```
### 退出循环
尽管 ES5 提供了 forEach 方法，但是 forEach 没有办法中止或者跳出 forEach 循环，除了抛出一个异常。但是对于 jQuery 的 each 函数，如果需要退出 each 循环可使回调函数返回 false，其它返回值将被忽略。
```js
$.each( [0, 1, 2, 3, 4, 5], function(i, n){
    if (i > 2) return false;
    console.log( "Item #" + i + ": " + n );
});

// Item #0: 0
// Item #1: 1
// Item #2: 2
```
### 第一版
首先,我们需要根据参数的类型进行判断,如果是数组,就调用for循环,如果是对象,就使用for in循环,有一个例外,如果是类数组对象,可以使用for循环.  
```js
function each(obj, callback) {
  var length, i = 0;
  if (isArrayLike(obj)) {
    length = obj.length;
    for (;i < length; i++) {
      callback(i, obj[i]);
    }
  } else {
    for (i in obj) {
      callback(i, obj[i])
    }
  }
  return obj;
}
```

### 终止循环
当回调函数返回false时,我们就终止循环
```js
if (callback(i, obj[i]) === false) {
    break;
}
```

### this
在实际开发是,我们会在callback函数中使用到this,如:
```js
// 我们给每个人添加一个 age 属性，age 的值为 18 + index
var person = [
    {name: 'kevin'},
    {name: 'daisy'}
]
$.each(person, function(index, item){
    this.age = 18 + index;
})

console.log(person)
```
这是我们希望this指向当前遍历的元素,然后给每个元素添加一个age属性
```js
if (callback.call(obj[i], i, obj[i]) === false) {
    break;
}
```
```js
// 最终版
function each(obj, callback) {
    var length, i = 0;

    if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }

    return obj;
}
```
### 性能比较
性能上比较一下for和each
```js
var arr = Array.from({length: 1000000}, (v, i) => i);

console.time('for')
var i = 0;
for (; i < arr.length; i++) {
    i += arr[i];
}
console.timeEnd('for')


console.time('each')
var j = 0;
$.each(arr, function(index, item){
    j += item;
})
console.timeEnd('each')
```
each明细比较for慢,原因很可能是使用了call绑定了this,导致性能损耗