### findIndex
ES6中的,会返回数组中满足提供的函数的第一个元素的索引,否则返回-1.

```js
function isBigEnough(element) {
  return element >= 15;
}
[12, 5, 8, 130, 44].findIndex(isBigEnough) // 3
```
findIndex会找出第一个大于15的元素的下班,最后会返回3

### 实现findIndex
通过遍历一遍,返回符合要求的值的下标
```js
function findIndex(array,predicate,context) {
  for (let i = 0; i < array.length; i++) {
    if (predicate.call(context, array[i], i, array)) return i;
    return -1;
  }
}
console.log(findIndex([1, 2, 3, 4], function(item, i, array){
    if (item == 3) return true;
})) // 2
```

### findLastIndex
findIndex 是正序查找，但正如 indexOf 还有一个对应的 lastIndexOf 方法，我们也想写一个倒序查找的 findLastIndex 函数。实现自然也很简单，只要修改下循环即可。
```js
function findLastIndex(array, predicate, context) {
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
        if (predicate.call(context, array[i], i, array)) return i;
    }
    return -1;
}

console.log(findLastIndex([1, 2, 3, 4], function(item, index, array){
    if (item == 1) return true;
})) // 0
```

### createIndexFinder
然而问题在于，findIndex 和 findLastIndex 其实有很多重复的部分，如何精简冗余的内容呢？这便是我们要学习的地方，日后面试问到此类问题，也是加分的选项。

underscore 的思路就是利用传参的不同，返回不同的函数。这个自然是简单，但是如何根据参数的不同，在同一个循环中，实现正序和倒序遍历呢？

让我们直接模仿 underscore 的实现：
```js
function createIndexFinder(dir) {
    return function(array, predicate, context) {

        var length = array.length;
        var index = dir > 0 ? 0 : length - 1;

        for (; index >= 0 && index < length; index += dir) {
            if (predicate.call(context, array[index], index, array)) return index;
        }

        return -1;
    }
}

var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);
```

### sortedIndex
在一个排好序的数组中找到value对应的位置,确保插入数组后,一人保存有序的状态.
```sortedIndex([10,20,30],25) // 2```  
注意,25按照此下标插入数组后,数组变成[10,20,25,30],数组依然是有序的状态.
如果是有序的数组,我们不需要遍历,直接使用二分法查找,确定值:  
```js
// 第一版
function sortedIndex(array, obj) {
  var low = 0, high = array.length;
  while (low < high) {
    var mid = Math.floor((low + high) / 2)
    if (array[mid] < obj) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return high
};

console.log(sortedIndex([10, 20, 30, 40, 50], 35)) // 3
```
这种方法能用,但通用性不够,比如我们希望能处理这样的情况:
```js
// stooges 配角 比如 三个臭皮匠 The Three Stooges
var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];

var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
    return stooge.age
});

console.log(result) // 1
```
因此还需要加上一个参数iteratee函数对数组进行对数组的每个元素进行赤露,一般这个时候,还会涉及到this的指向问题,所以需要一个context来指定this,
```js
function cb (func,context) {
  if (context === void 0) return func;
  return function () {
    return func.applay(context,arguments);
  }
}
function sortedIndex(array,obj,iteratee, context) {
  iteratee = cb(iteratee,context);
  var low = 0, high = array.length;
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < iteratee(obj)) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return high
}
```

### indexOf
```js
// 第一版
function createIndexOfFinder(dir) {
  return function(array, item) {
    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (item === array[index]) {
        return index
      }
    }
    return -1;
  }
}

var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);

var result = indexOf([1, 2, 3, 4, 5], 2);

console.log(result) // 1
```

### fromIndex
数组的indexOf可以多传递一个参数fromIndex, MDN:
> 设定开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回 -1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即 -1 表示从最后一个元素开始查找，-2 表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，仍然从前向后查询数组。如果抵消后的索引值仍小于 0，则整个数组都将会被查询。其默认值为 0。  

lastIndexOf的fromIndex:
> 从此位置开始逆向查找。默认为数组的长度减 1，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。  

```js
// 第二版
function createIndexOfFinder(dir) {
  return function(array, item, idx) {
    var length = array.length;
    var i = 0;
    if (typeof idx === 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(length + idx, 0)
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (item === array[idx]) {
        return idx
      }
    }
    return -1;
  }
}

var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);

var result = indexOf([1, 2, 3, 4, 5], 2, -3);
```
### 优化
underscore还支持两点优化  
#### 1.第一个优化支持查找NaN.  
因为NaN不全等于NaN,所以原生的indexOf并不能找出NaN的下标.
``` js
[1, NaN].indexOf(NaN) // -1

// 第三版
function createIndexOfFinder(dir, predicate) {

    return function(array, item, idx){

        if () { ... }

        // 判断元素是否是 NaN
        if (item !== item) {
            // 在截取好的数组中查找第一个满足isNaN函数的元素的下标
            idx = predicate(array.slice(i, length), isNaN)
            return idx >= 0 ? idx + i: -1;
        }

        for () { ... }
    }
}

var indexOf = createIndexOfFinder(1, findIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);
```

#### 2.第二个优化是支持对有序的数组进行更快的二分查找。
如果indexOf第三个参数不传开始搜索的下标值,而是一个布尔值true,就认为数组是一个排好序的数组,这时候用二分法进行查找
```js
function createIndexOfFinder(dir, predicate, sortedIndex) {
  return function (array, item, idx) {
    var length = array.length;
    var i = 0;
    if (typeof idx == 'number') {
      // 从前往后查
      if (dir > 0) {
        i = idx >= 0 ? idx :Math.max(length + idx, 0);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }
    // 判断是否是NaN
    if (item !== item) {
      idx = predicate(array.slice(i, length), isNaN)
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
    }
    return -1; 
  }
}

var indexOf = createIndexOfFinder(1, findIndex, sortedIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);
```