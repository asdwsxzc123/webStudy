## 前言

仅看 cb 和 optimizeCb 两个函数的名字，你可能想不到这是用来做什么的，尽管你可能想到 cb 是 callback 的缩写。

如果直接讲解源码，你可能想不明白为什么要这么写，所以我们从 \_.map 函数开始讲起。

## map

map 类似于 Array.prototype.map，但更加健壮和完善。我们看下 \_.map 的源码：

```js
_.map = _.collect = function(obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  var keys = !isArrayLike(obj) && _.keys(obj),
    length = (keys || obj).length,
    results = Array(length);
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
};
```

map 方法除了传入要处理的数组之外，还有两个参数 iteratee 和 context，类似于 Array.prototype.map 中的其他两个参数，其中 iteratee 表示处理函数，context 表示指定的执行上下文，即 this 的值。

然后在源码中，我们看到，我们将 iteratee 和 context 传入一个 cb 函数，然后覆盖掉 iteratee 函数，然后将这个函数用作最终的处理函数。

实际上，需要这么麻烦吗？不就是使用 iteratee 函数处理每次迭代的值吗？不就是通过 context 指定 this 的值吗？我们可以直接这样写呐：

如果 iteratee 我们不传入一个函数呢？比如我们什么也不传，或者传入一个对象，又或者传入一个字符串、数字呢？

如果用我们的方法自然是会报错的，那 underscore 呢？

```js
// underscore
// 什么也不传
var result = _.map([1, 2, 3]); // [1, 2, 3]

// 传入一个对象
var result = _.map([{ name: "Kevin" }, { name: "Daisy", age: 18 }], {
  name: "Daisy"
}); // [false, true]

var result = _.map([{ name: "Kevin" }, { name: "Daisy" }], "name"); // ['Kevin', 'daisy']
```

我们会发现，underscore 竟然还能根据传入的值的类型不同，实现的效果不同。我们总结下：

1. 当 iteratee 不传时，返回一个相同的数组。
1. 当 iteratee 为一个函数，正常处理。
1. 当 iteratee 为一个对象，返回元素是否匹配指定的对象。
1. 当 iteratee 为字符串，返回元素对应的属性值的集合。

## cb

```js
// 源码
var cb = function(value, context, argCount) {
  if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
  if (value == null) return _.identity;
  if (_.isFunction(value)) return optimizeCb(value, context, argCount);
  if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
  return _.property(value);
};
```

## \_.iteratee

```js
if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
```

在看看 iteratee 的源码

```js
_.iteratee = builtinIteratee = function(value, context) {
  return cb(value, context, Infinity);
};
```

因为 _.iteratee = builtinIteratee 的缘故，_.iteratee !== builtinIteratee 值为 false，所以正常情况下 _.iteratee(value, context) 并不会执行。
但是如果我们在外部修改了 _.iteratee 函数，结果便会为 true，cb 函数直接返回 \_.iteratee(value, context)。

这个意思其实是说用我们自定义的 \_.iteratee 函数来处理 value 和 context。

试想我们并不需要现在 \_.map 这么强大的功能，我只希望当 value 是一个函数，就用该函数处理数组元素，如果不是函数，就直接返回当前元素，我们可以这样修改：

## \_.identity

```js
if (value == null) return _.identity;

// 源码
_.identity = function(value) {
  return value;
};

// 这也就是为什么当 map 的第二个参数什么都不传的时候，结果会是一个相同数组的原因。
_.map([1, 2, 3]); // [1, 2, 3]
```

## optimizeCb

```js
if (_.isFunction(value)) return optimizeCb(value, context, argCount);

// 源码
var optimizeCb = function(func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function(value) {
        return func.call(context, value);
      };
    // The 2-argument case is omitted because we’re not using it.
    case 3:
      return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
    case 4:
      return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }
  return function() {
    return func.apply(context, arguments);
  };
};
```

也许你会好奇，为什么要对 argCount 进行判断呢？就不能直接返回吗？比如这样：

```js
var optimizeCb = function(func, context) {
  // 如果没有传入 context，就返回 func 函数
  if (context === void 0) return func;
  return function() {
    return func.apply(context, arguments);
  };
};
```

为什么 underscore 要这样做呢？就是为了避免使用 arguments，提高一点性能而已，如果不是写一个库，其实还真是没有必要做到这点。

而为什么当参数是 3 个时候，参数名称分别是 value, index, collection ，又为什么没有参数为 2 的情况呢？其实这都是根据 underscore 函数用到的情况，没有函数用到两个参数，于是就省略了，像 map 函数就会用到 3 个参数，就根据这三个参数的名字起了这里的变量名啦。

## matcher

```js
// 如果 value 是一个对象，并且不是数组，就使用 _.matcher 函数。看看各个函数的源码
if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);

// 这段就是用来处理当 map 的第二个参数是对象的情况：
// 传入一个对象
var result = _.map([{ name: "Kevin" }, { name: "Daisy", age: 18 }], {
  name: "Daisy"
}); // [false, true]

_.matcher = _.matches = function(attrs) {
  attrs = _.extendOwn({}, attrs);
  return function(obj) {
    return _.isMatch(obj, attrs);
  };
};

_.isMatch = function(object, attrs) {
  var keys = _.keys(attrs),
    length = keys.length;
  if (object == null) return !length;
  var obj = Object(object);
  for (var i = 0; i < length; i++) {
    var key = keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }
  return true;
};
```

## property

```js
return _.property(value);
// 这个就是处理当 value 是基本类型的值的时候，返回元素对应的属性值的情况：
var result = _.map([{ name: "Kevin" }, { name: "Daisy" }], "name"); // ['Kevin', 'daisy']

// 源码
_.property = function(path) {
  if (!_.isArray(path)) {
    return shallowProperty(path);
  }
  return function(obj) {
    return deepGet(obj, path);
  };
};

var shallowProperty = function(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
};

var deepGet = function(obj, path) {
  var length = path.length;
  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }
  return length ? obj : void 0;
};

// 原来 value 还可以传一个数组，用来取深层次的值，举个例子：
var person1 = {
  child: {
    nickName: "Kevin"
  }
};

var person2 = {
  child: {
    nickName: "Daisy"
  }
};

var result = _.map([person1, person2], ["child", "nickName"]);
console.log(result); // ['Kevin', 'daisy']
```
