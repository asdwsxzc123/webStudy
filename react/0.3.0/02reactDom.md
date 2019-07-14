## 源码

```js
var mergeInto = require('mergeInto');
const objMapKeyVal = require('./utils/objMapKeyVal');

function createDOMComponentClass(tag, omitClose) {
  var Constructor = function() {};

  Constructor.prototype.constructor = Constructor;

  return function(props, children) {
    var instance = new Constructor();
    instance.construct.apply(instance, arguments);
    return instance;
  };
}

/**
 * Creates a mapping from supported HTML tags to`React.DOM`.值代表dom是否为自闭合
 *
 * @public
 */
var ReactDOM = objMapKeyVal(
  {
    a: false,
    abbr: false,
    address: false,
    audio: false,
    b: false,
    body: false,
    br: true,
    button: false,
    code: false,
    col: true,
    colgroup: false,
    dd: false,
    div: false,
    section: false,
    dl: false,
    dt: false,
    em: false,
    embed: true,
    fieldset: false,
    footer: false,
    // Danger: this gets monkeypatched! See ReactDOMForm for more info.
    form: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    header: false,
    hr: true,
    i: false,
    iframe: false,
    img: true,
    input: true,
    label: false,
    legend: false,
    li: false,
    line: false,
    nav: false,
    object: false,
    ol: false,
    optgroup: false,
    option: false,
    p: false,
    param: true,
    pre: false,
    select: false,
    small: false,
    source: false,
    span: false,
    sub: false,
    sup: false,
    strong: false,
    table: false,
    tbody: false,
    td: false,
    textarea: false,
    tfoot: false,
    th: false,
    thead: false,
    time: false,
    title: false,
    tr: false,
    u: false,
    ul: false,
    video: false,
    wbr: false,

    // SVG
    circle: false,
    g: false,
    path: false,
    polyline: false,
    rect: false,
    svg: false,
    text: false
  },
  createDOMComponentClass
);

var injection = {
  injectComponentClasses: function(componentClasses) {
    mergeInto(ReactDOM, componentClasses);
  }
};

ReactDOM.injection = injection;

export default ReactDOM;
```

## objMapKeyVal

objMapKeyVal 函数遍历所有 dom 对象,并返回一个新的 DOMmap 表,存储了函数方法,函数的执行上下文保持不变,函数的参数,分别是执行上下文,dom 的名称,dom 的值(是否是自闭合标签 boolean),序号

```js
function objMapKeyVal(obj, func, context) {
  if (!obj) {
    return null;
  }
  var i = 0;
  var ret = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = func.call(context, key, obj[key], i++);
    }
  }
  return ret;
}
```

## createDOMComponentClass

objMapKeyVal 的回调函数 createDOMComponentClass,返回一个闭包函数,可以传入(props,children)两个参数.闭包函数返回 ReactNativeComponent 的实例.  
构造函数 ReactNativeComponent 参数(dom 的 tag,和是否自闭合)实例化后给构造函数 Constructor 的原型添加属性和方法

```js
function createDOMComponentClass(tag, omitClose) {
  var Constructor = function() {};
  Constructor.prototype = new ReactNativeComponent(tag, omitClose);
  Constructor.prototype.constructor = Constructor;

  return function(props, children) {
    var instance = new Constructor();
    instance.construct.apply(instance, arguments);
    return instance;
  };
}
```

## mergeInto

官方介绍 mergeInto 函数浅层合并 2 个结构体,然后改变第一个参数

```js
var injection = {
  injectComponentClasses: function(componentClasses) {
    mergeInto(ReactDOM, componentClasses);
  }
};

ReactDOM.injection = injection;

var mergeHelpers = require('./mergeHelpers');

var checkMergeObjectArg = mergeHelpers.checkMergeObjectArg;

/**
 * Shallow merges two structures by mutating the first parameter.
 *
 * @param {object} one Object to be merged into.
 * @param {?object} two Optional object with properties to merge from.
 */
function mergeInto(one, two) {
  checkMergeObjectArg(one);
  if (two != null) {
    checkMergeObjectArg(two);
    for (var key in two) {
      if (!two.hasOwnProperty(key)) {
        continue;
      }
      one[key] = two[key];
    }
  }
}

module.exports = mergeInto;

// 检查合并对象参数
var checkMergeObjectArg = function(arg) {
  throwIf(isTerminal(arg) || Array.isArray(arg), ERRORS.MERGE_CORE_FAILURE);
};

//  我们不会担心像new string（‘x’）或new boolean（true）这样的边缘情况。用来判断边界问题
var isTerminal = function(o) {
  return typeof o !== 'object' || o === null;
};

// 如果isTerminal(arg)是true就做抛错处理
var throwIf = function(condition, err) {
  if (condition) {
    throw new Error(err);
  }
};
```
