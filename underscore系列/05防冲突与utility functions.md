## 防冲突

underscore 使用 _ 作为函数的挂载对象，如果页面中已经存在了 _ 对象，underscore 就会覆盖该对象，举个例子:

```js
var _ = { value: 1 };

// 引入 underscore 后
console.log(_.value); // undefined
```

所以 underscore 提供了 noConflict 功能，可以放弃 underscore 的控制变量 \_，返回 underscore 对象的引用。

```js
var _ = { value: 1 };

// 引入 underscore 后

// 放弃 "_"，使用 "$"
var $ = _.noConflict();

console.log(_.value); // 1

// 使用 underscore 的方法
$.each([1, 2, 3], alert);
```

实现原理

首先，在 underscore 执行的时候，会储存之前的 _ 对象，然后当执行 noConflict 函数的时候，再将之前储存的 _ 对象赋给全局对象，最后返回 underscore 对象。这样，我们就可以利用返回的 underscore 对象使用 underscore 提供的各种方法。

```js
// Save the previous value of the `_` variable.
var previousUnderscore = root._;
_.noConflict = function() {
  root._ = previousUnderscore;
  return this;
};
```

## \_.identity

```js
_.identity = function(value) {
  return value;
};
```

传入一个值，然后返回该值，为什么不直接使用该值呢？

如果我们自己编写了一个 \_.map 函数:

```js
_.map = function(arr, iteratee) {
  return arr.map(iteratee);
};
```

然而当我们这样使用 _.map([1, 2, 3]) 时便会报错，因为我们没有传入 iteratee 函数，然而使用 underscore 却没有问题，结果是返回一个相同的新数组，原因就在于当 iteratee 为 undefined 的时候，underscore 视为传入了 _.identity 函数。就相当于:

```js
_.map = function(arr, iteratee) {
  if (!iteratee) iteratee = _.identity;
  return arr.map(iteratee);
};
```

简而言之，如果我们想要复制一个数组:

```js
var clonedArr = [1, 2, 3].map(_.identity); // [1, 2, 3]
```

## \_.constant

```js
_.constant = function(value) {
  return function() {
    return value;
  };
};
```

该函数传入一个 value，然后返回一个返回该 value 的函数，这又有什么用呢？我们来看个 demo:

```js
var value = 1;
var getValue = _.constant(value);

value = 2;

getValue(); // 1
getValue(); // 1
```

这很容易让人想到 ES6 的 const，我一开始以为就是用来表示 ES6 的 const ，后来看了这个函数起源的 issue，才发现并非如此，它其实像下面的 \_.noop 函数一样可以作为默认函数使用。

```js
_.select(
  collection,
  filterFunction ||
    function() {
      return true;
    }
);
```

我们根据 filterFunction 筛选 collection 中符合条件的元素，如果没有传 filterFunction，我们就返回所有的元素，如果有 \_.constant 函数，我们可以将其简化为：

```js
_.select(collection, filterFunction || _.constant(true));
```

## \_.noop

```js
_.noop = function() {};
```

一个空函数，看起来依旧没什么用……

noop 函数可以用于作为默认值，这样就可以省去是否存在的判断，举个例子：

```js
// 不使用 noop
function a(value, callback) {
  // 每次使用 callback 都要判断一次
  _.isFunction(callback) && callback();
}

// 使用 noop
function a(value, callback) {
  // 判断一次
  if (!_.isFunction(callback)) callback = _.noop;

  // 以后都可以直接使用
  callback();
}
```

## deepGet

```js
var deepGet = function(obj, path) {
  var length = path.length;
  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }
  return length ? obj : void 0;
};
```

deepGet 用于获得对象深层次的值。举个例子：

```js
var obj = {
  value: {
    deepValue: 2
  }
};

console.log(deepGet(obj, ["value", "deepValue"]));
```

## shallowProperty

```js
var shallowProperty = function(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
};
```

shallowProperty 也是用于获取对象的属性，也许你会好奇在开发中，直接使用. 不就可以获取对象的属性了，为什么还要写成这样呢？我们来举个例子：

```js
// 获取 arr 所有元素的 name 属性
var arr = [
  {
    value: 1,
    name: "Kevin"
  },
  {
    value: 2,
    name: "Daisy"
  }
];

// 普通方式
var names = arr.map(function(item) {
  return item.name;
});

// 使用 shallowProperty
var names = arr.map(shallowProperty("name"));
```

## \_.property

```js
_.property = function(path) {
  if (!_.isArray(path)) {
    return shallowProperty(path);
  }
  return function(obj) {
    return deepGet(obj, path);
  };
};
```

\_.property 结合了 deepGet 和 shallowProperty，可以获取元素深层次的值。上面一个例子也可以写成：

```js
var names = arr.map(_.property("name"));
```

## \_.propertyOf

```js
_.propertyOf = function(obj) {
  if (obj == null) {
    return function() {};
  }
  return function(path) {
    return !Array.isArray(path) ? obj[path] : deepGet(obj, path);
  };
};
```

\_.property 返回一个函数，这个函数返回任何传入的对象的指定属性。

_.propertyOf 与 _.property 相反。需要一个对象，并返回一个函数，这个函数将返回一个提供的属性的值。

```js
// 获取 person 对象的所有属性值
var person = {
  name: "Kevin",
  age: "18"
};

// 普通方式
var values = Object.keys(person).map(key => person[key]); // ["Kevin", "18"]

// 使用 _.propertyOf
var values = Object.keys(person).map(_.propertyOf(person)); // ["Kevin", "18"
```
