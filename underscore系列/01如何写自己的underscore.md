## 如何实现

```js
(function() {
  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = this;
  // Create a safe reference to the Underscore object for use below.
  var _ = {};
  root._ = _;
  // 在这里添加自己的方法
  _.reverse = function(string) {
    return string
      .split("")
      .reverse()
      .join("");
  };
})();
console.log(_.reverse("hello"));
// => 'olleh'
```

我们将所有的方法添加到一个名为 \_ 的对象上，然后将该对象挂载到全局对象上。

之所以不直接 window._ = _ 是因为我们写的是一个工具函数库，不仅要求可以运行在浏览器端，还可以运行在诸如 Node 等环境中。

## root

var root = this

之所以写这一句，是因为我们要通过 this 获得全局对象，然后将 \_ 对象，挂载上去。

然而在严格模式下，this 返回 undefined，而不是指向 Window，幸运的是 underscore 并没有采用严格模式，可是即便如此，也不能避免，因为在 ES6 中模块脚本自动采用严格模式，不管有没有声明 use strict。

如果 this 返回 undefined，代码就会报错，所以我们的思路是对环境进行检测，然后挂载到正确的对象上。我们修改一下代码：

```js
var root =
  (typeof window == "object" && window.window == window && window) ||
  (typeof global == "object" && global.global == global && global);
```

在这段代码中，我们判断了浏览器和 Node 环境，可是只有这两个环境吗？那我们来看看 Web Worker

## web worker

引用《JavaScript 权威指南》中的话就是：

> 在 Web Worker 标准中，定义了解决客户端 JavaScript 无法多线程的问题。其中定义的 “worker” 是指执行代码的并行过程。不过，Web Worker 处在一个自包含的执行环境中，无法访问 Window 对象和 Document 对象，和主线程之间的通信业只能通过异步消息传递机制来实现。

在 Web Worker 中，是无法访问 Window 对象的，所以 typeof window 和 typeof global 的结果都是 undefined，所以最终 root 的值为 false，将一个基本类型的值像对象一样添加属性和方法，自然是会报错的。

那么我们该怎么办呢？

虽然在 Web Worker 中不能访问到 Window 对象，但是我们却能通过 self 访问到 Worker 环境中的全局对象。我们只是要找全局变量挂载而已，所以完全可以挂到 self 中嘛。

而且在浏览器中，除了 window 属性，我们也可以通过 self 属性直接访问到 Winow 对象。

```js
console.log(window.window === window); // true
console.log(window.self === window); // true

var root =
  (typeof self == "object" && self.self == self && self) ||
  (typeof global == "object" && global.global == global && global);
```

## node vm

在 node 的 vm 模块中，也就是沙盒模块，runInContext 方法中，是不存在 window，也不存在 global 变量的

但是我们却可以通过 this 访问到全局对象，所以就有人发起了一个 PR，代码改成了：

```js
var root =
  (typeof self == "object" && self.self == self && self) ||
  (typeof global == "object" && global.global == global && global) ||
  this;
```

## 微信小程序

因为在微信小程序中，window 和 global 都是 undefined，加上又强制使用严格模式，this 为 undefined，挂载就会发生错误，所以就有人又发了一个 PR，代码变成了：

```js
var root =
  (typeof self == "object" && self.self == self && self) ||
  (typeof global == "object" && global.global == global && global) ||
  this ||
  {};
```

代码的健壮性，并非一蹴而就，而是汇集了很多人的经验，考虑到了很多我们意想不到的地方，这也是开源项目的好处吧。

## 函数对象

现在我们讲第二句 var \_ = {};。

如果仅仅设置 _ 为一个空对象，我们调用方法的时候，只能使用 _.reverse('hello') 的方式，实际上，underscore 也支持类似面向对象的方式调用，即：

```js
_("hello").reverse(); // 'olleh'

// 函数式风格
_.each([1, 2, 3], function(item) {
  console.log(item);
});

// 面向对象风格
_([1, 2, 3]).each(function(item) {
  console.log(item);
});

// underscore的实现
var _ = function(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};
_([1, 2, 3]);
```

我们分析下 \_([1, 2, 3]) 的执行过程：

1. 判断 obj 这个对象是不是指向\_,如果是就直接返回 underscore 对象.
2. 执行 this instanceof _，this 指向 window ，window instanceof _ 为 false，!操作符取反，所以执行 new \_(obj)。
3. new _(obj) 中，this 指向实例对象，this instanceof _ 为 true，取反后，代码接着执行
4. 执行 this.\_wrapped = obj， 函数执行结束
5. 总结，_([1, 2, 3]) 返回一个对象，为 {\_wrapped: [1, 2, 3]}，该对象的原型指向 _.prototype

然后问题来了，我们是将方法挂载到 _ 函数对象上，并没有挂到函数的原型上呐，所以返回了的实例，其实是无法调用 _ 函数对象上的方法的！

```js
(function() {
  var root =
    (typeof self == "object" && self.self == self && self) ||
    (typeof global == "object" && global.global == global && global) ||
    this ||
    {};

  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  root._ = _;

  _.log = function() {
    console.log(1);
  };
})();

_().log(); // _(...).log is not a function
```

确实有这个问题，所以我们还需要一个方法将 _ 上的方法复制到 _.prototype 上，这个方法就是 \_.mixin。

## \_.functions

为了将 _ 上的方法复制到原型上，首先我们要获得 _ 上的方法，所以我们先写个 \_.functions 方法。

```js
_.functions = _.methods = function(obj) {
  var names = [];
  for (var key in obj) {
    if (_.isFunction(obj[key])) names.push(key);
  }
  return names.sort();
};
```

## mixin

```js
_.mixin = function(obj) {
  _.each(_.functions(obj), function(name) {
    var func = (_[name] = obj[name]);
    _.prototype[name] = function() {
      var args = [this._wrapped];
      push.apply(args, arguments);
      return func.apply(_, args);
    };
  });
  return _;
};
```

值得注意的是：因为 \_[name] = obj[name] 的缘故，我们可以给 underscore 拓展自定义的方法:

```js
_.mixin({
  addOne: function(num) {
    return num + 1;
  }
});

_(2).addOne(); // 3
```

## 导出

```js
if (typeof exports != "undefined" && !exports.nodeType) {
  if (typeof module != "undefined" && !module.nodeType && module.exports) {
    exports = module.exports = _;
  }
  exports._ = _;
} else {
  root._ = _;
}
```

所以我们根据 exports 和 module 是否存在来选择不同的导出方式，那为什么在新版本中，我们还要使用 exports = module.exports = \_ 呢？

这是因为在 nodejs 中，exports 是 module.exports 的一个引用，当你使用了 module.exports = function(){}，实际上覆盖了 module.exports，但是 exports 并未发生改变，为了避免后面再修改 exports 而导致不能正确输出，就写成这样，将两者保持统一。

最后为什么要进行一个 exports.nodeType 判断呢？这是因为如果你在 HTML 页面中加入一个 id 为 exports 的元素，比如

```js
<div id="exports" />
```

就会生成一个 window.exports 全局变量，你可以直接在浏览器命令行中打印该变量。

此时在浏览器中，typeof exports != 'undefined' 的判断就会生效，然后 exports._ = _，然而在浏览器中，我们需要将 \_ 挂载到全局变量上呐，所以在这里，我们还需要进行一个是否是 DOM 节点的判断。

## 源码

```js
(function() {
  var root =
    (typeof self == "object" && self.self == self && self) ||
    (typeof global == "object" && global.global == global && global) ||
    this ||
    {};

  var ArrayProto = Array.prototype;

  var push = ArrayProto.push;

  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  if (typeof exports != "undefined" && !exports.nodeType) {
    if (typeof module != "undefined" && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  _.VERSION = "0.1";

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  var isArrayLike = function(collection) {
    var length = collection.length;
    return (
      typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX
    );
  };

  _.each = function(obj, callback) {
    var length,
      i = 0;

    if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    }

    return obj;
  };

  _.isFunction = function(obj) {
    return typeof obj == "function" || false;
  };

  _.functions = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  /**
   * 在 _.mixin(_) 前添加自己定义的方法
   */
  _.reverse = function(string) {
    return string
      .split("")
      .reverse()
      .join("");
  };

  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function() {
        var args = [this._wrapped];

        push.apply(args, arguments);

        return func.apply(_, args);
      };
    });
    return _;
  };

  _.mixin(_);
})();
```
