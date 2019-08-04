/**
 * react v16.8.6
 * react.development.js
 * umd通用模块规范
 */

'use strict';
//  这一段是为了识别
(function(global, factory) {
  // commonjs规范 nodejs
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'undefined' && define.amd
    ? //amd规范 requirejs
      define(factory)
    : //  普通引用,挂载在全局
      (global.React = factory());
})(this, function() {
  'use strict';
  // TODO: this is special because it gets imported during build.
  var ReactVersion = '16.8.6';

  // the Symbol used to tag the ReactElement-like types.if there is no native Symbol
  // symbol类型用来标记类reactElement类型,如果没有Symbol类型,没有polyfill转移,就用一个普通数字表示性能
  // nor polyfill, then a plain number is used for performance.
  // 判断有没有Symbol类型
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  // 如果有,使用Symbol.for注册一个react.element的全局symbol, 否则 使用0xeac7
  // react 数据类型
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  // Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  // 空元素
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol
    ? Symbol.for('react.strict_mode')
    : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  // Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;

  var REACT_CONCURRENT_MODE_TYPE = hasSymbol
    ? Symbol.for('react.concurrent_mode')
    : 0xeacf;
  // Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。
  var REACT_FORWARD_REF_TYPE = hasSymbol
    ? Symbol.for('react.forward_ref')
    : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

  // 判断是否有symbol iterator迭代器
  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== 'object') {
      return null;
    }
    var maybeIterable =
      (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
      maybeIterable[FAUX_ITERATOR_SYMBOL];
    if (typeof maybeIterable === 'function') {
      return maybeIterable;
    }
    return null;
  }

  // object-assign 作者版权
  /*
object-assign
(c) Sindre Sorhus
@license MIT
*/

  // 判断在symbol中是否存在
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  // 判断是否存在
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  // 判断对象是否可以枚举,(for in)
  var propIsEnumberable = Object.prototype.propIsEnumberable;

  // 转化成对象,如果不能转化,抛错
  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError(
        'Object.assign cannot be called with null or undefined'
      );
    }
    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      // Detect buggy property enumeration order in older V8 versions.
      // v8老版本的bug,查看这几个bug,最好翻墙看

      // 2015年5月16号提出的一个v8引擎关于Object.getOwnPropertyNames 返回错误排序的bug
      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String('abc');
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }

      // 2013年12月12号提出关于v8 getOwnPropertyNames 没有返回正确的插入顺序
      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }

      //2013年12月12号提出关于v8  Object.keys(获取所有的keys)和Object.assign(合并对象),遍历后乱序bug
      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
        test3[letter] = letter;
      });
      if (
        Object.keys(Object.assign({}, test3)).join('') !==
        'abcdefghijklmnopqrst'
      ) {
        return false;
      }
      return true;
    } catch (error) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }
  // 先进行是否可以Object.assign进行合并,如果不行,使用自己的方法
  /**
   * objectAssign({}, {}, ...{})//可以对多个数组进行合并,返回到第一个数组中
   */
  var objectAssign = shouldUseNative()
    ? Object.assign
    : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = form[key];
            }
          }

          // 判断是否有symbol属性
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              // 判断是否可以遍历
              if (propIsEnumberable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }

          return to;
        }
      };

  /**
   *  使用 invariant()不变量,去断言程序假定为真的状态
   *  提供sprintf样式的格式（仅支持%s）和参数去提供期望的和坏的信息
   *  不变的信息在生产环境被剥离,但是保持以确保生产中的逻辑不存在差异
   */
  var validateFormat = function() {};
  {
    validateFormat = function(format) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    };
  }
  function invariant(condition, format, a, b, c, d, e, f) {
    validateFormat(format);
    if (!condition) {
      var error = void 0; // undefined
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
            'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          format.replace(/%s/g, function() {
            return args[argIndex++];
          })
        );
        error.name = 'Invariant Violation';
      }
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  }
  // 依靠“invariant（）”实现，我们可以 在www版本中保留格式和参数
  // Relying on the `invariant()` implementation lets us
  // preserve the format and params in the www builds.

  /**
   * forked from fbjs/warning:
   * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
   * 仅仅改变我们使用console,告警而不是console.error, 如果不支持“console”，则不执行任何操作。
   * 这是真的简化代码
   * 类似于不变量，但仅在不满足条件时记录警告。
   * 这可用于在关键的开发环境中记录问题路径。删除生产环境的日志代码将保留相同的逻辑，遵循相同的代码路径。
   */
  var lowPriorityWarning = function() {};
  {
    var printWarning = function(format) {
      for (
        var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        args[_key - 1] = arguments[_key];
      }
    };
    lowPriorityWarning = function(condition, format) {
      if (format === undefined) {
        throw new Error(
          '`lowPriorityWarning(condition, format, ...args)` requires a warning ' +
            'message argument'
        );
      }
      if (!condition) {
        for (
          var _len2 = arguments.length,
            args = Array(_len2 > 2 ? _len2 - 2 : 0),
            _key2 = 2;
          _key2 < _len2;
          _key2++
        ) {
          args[_key2 - 2] = arguments[_key2];
        }
      }

      printWarning.apply(undefined, [format].concat(args));
    };
  }
  var lowPriorityWarning$1 = lowPriorityWarning;

  /**
   * 类似于不变量，但仅在不满足条件时记录警告。
   * 这可用于在关键的开发环境中记录问题路径。删除生产环境的日志代码将保留相同的逻辑，遵循相同的代码路径。
   */
  var warningWithoutStack = function() {};
  {
    warningWithoutStack = function(condition, format) {
      for (
        var _len = arguments.length,
          args = Array(_len > 2 ? _len - 2 : 0),
          _key = 2;
        _key < _len;
        _key++
      ) {
        args[_key - 2] = arguments[_key];
      }

      if (format === undefined) {
        // 模板字符串可以运行函数
        throw new Error(
          '`warningWithoutStack(condition, format, ...args)` requires a warning ' +
            'message argument'
        );
      }
      if (args.length > 8) {
        // Check before the condition to catch violations early.
        throw new Error(
          'warningWithoutStack() currently supports at most 8 arguments.'
        );
      }
      if (condition) {
        return;
      }
      if (typeof console !== 'undefined') {
        var argsWithFormat = args.map(function(item) {
          return '' + item;
        });
        argsWithFormat.unshift('Warning: ' + format);

        // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610
        Function.prototype.apply.call(console.error, console, argsWithFormat);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        var argIndex = 0;
        var message =
          'Warning: ' +
          format.replace(/%s/g, function() {
            return args[argIndex++];
          });
        throw new Error(message);
      } catch (x) {}
    };
  }
  var warningWithoutStack$1 = warningWithoutStack;
  var didWarnStateUpdateForUnmountedComponent = {};
  function warnNoop(publicInstance, callerName) {
    {
      var _constructor = publicInstance.constructor;
      var componentName =
        (_constructor && (_constructor.displayName || _constructor.name)) ||
        'ReactClass';
      var warningKey = componentName + '.' + callerName;
      if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
        return;
      }
      warningWithoutStack$1(
        false,
        "Can't call %s on a component that is not yet mounted. " +
          'This is a no-op, but it might indicate a bug in your application. ' +
          'Instead, assign to `this.state` directly or define a `state = {};` ' +
          'class property with the desired state in the %s component.',
        callerName,
        componentName
      );
      didWarnStateUpdateForUnmountedComponent[warningKey] = true;
    }
  }

  /**
   * 这是抽象api针对更新队列
   */
  var ReactNoopUpdateQueue = {
    /**
     * 检查是否已安装此复合组件。
     * @params{ReactClass} publicInstance 实例我们用来测试
     * @return {boolean} 如果加装完成true,否则false
     * @protected
     * @final
     */

    isMounted: function(publicInstance) {
      return false;
    },

    /**
     * 强制更新。只有当确信我们在一个DOM事务中是**而不是**时，才应该调用它。
     * 当你知道 组件的状态已更改，但未调用'setstate'。
     * 这不会调用“shouldComponentUpdate”，但会调用 ` componentwillupdate`和'componentdiddupdate`。
     * @param {} publicInstance 这个实现需要渲染
     * @param {*} callback 更新后调用
     * @param {*} callerName 公共API中调用函数的名称。
     * @internal 内部的
     */
    enqueueForeceUpdate: function(publicInstance, callback, callerName) {
      warnNoop(publicInstance, 'forceUpdate');
    },
    /**
     *
     * @param {ReactClass} publicInstance 实例需要渲染
     * @param {object} completeState 新的状态
     * @param {?function} callback 回调函数
     * @param {?string} callerName 公共api函数的名称
     */
    enqueueReplaceState: function(
      publicInstance,
      completeState,
      callback,
      callerName
    ) {
      warnNoop(publicInstance, 'replaceState');
    },
    /**
     *
     * @param {ReactClass} publicInstance 实例需要渲染
     * @param {object} partialState 新的状态
     * @param {?function} callback 回调函数
     * @param {?string} callerName 公共api函数的名称
     */
    enqueueSetState: function(
      publicInstance,
      partialState,
      callback,
      callerName
    ) {
      warnNoop(publicInstance, 'setState');
    }
  };
  var emptyObject = {};
  {
    Object.freeze(emptyObject);
  }

  /**
   *  用于组件更新状态的基类助手。
   *
   * @param {*} props
   * @param {*} context
   * @param {*} updater
   */
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    // 如果一个组件有字符串引用，我们稍后将分配一个不同的对象。
    this.refs = emptyObject;
    // 我们初始化默认的更新程序，但实际的更新程序被渲染器。
    this.updater = updater || ReactNoopUpdateQueue;
  }
  Component.prototype.isReactComponent = {};

  /**
   * 设置状态的子集。总是用这个转变状态。您应该将“this.state”视为不可变的。
   *
   * 无法保证“this.state”将立即更新，因此调用此方法后访问“this.state”可能会返回旧值。
   *
   * 无法保证对“setstate”的调用将同步运行， 因为它们最终可能会一起被批处理。您可以提供一个可选的 当对setState的调用实际为完整的。
   *
   *当函数被提供给setstate时，它将在未来（不是同步的）。它将与最新的组件参数（状态、属性、上下文）。这些值可能不同 因为函数可以在接收props之后但在 shouldComponentUpdate，而这个新状态、属性和上下文还不会分配给此。
   * @param {object|function} partialState Next partial state or function to
   *        produce next partial state to be merged with current state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */
  Component.prototype.setState = function(partialState, callback) {
    !(
      typeof partialState === 'object' ||
      typeof partialState === 'function' ||
      partialState == null
    )
      ? invariant(
          false,
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        )
      : void 0;
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  };
  /**
   * 强制更新。只有当它被确定我们在DOM事务中**不是**。
   *
   *当你知道组件的状态已更改，但未调用'setstate'。
   *
   * 这不会调用“shouldComponentUpdate”，但会调用` componentwillupdate`和'componentdiddupdate`。
   *
   * @param {?function} callback 回调函数
   * @final
   * @protected
   */
  Component.prototype.forceUpdate = function(callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
  };
  /**
   * 已弃用的API。这些API以前存在于经典的react类上，但是自从 我们想贬低他们，我们不会把他们转移到这个问题上。 现代的基础阶级。相反，我们定义了一个getter，它会在访问时发出警告。
   */
  {
    var deprecatedAPIs = {
      isMounted: [
        'isMounted',
        'Instead, make sure to clean up subscriptions and pending requests in ' +
          'componentWillUnmount to prevent memory leaks.'
      ],
      replaceState: [
        'replaceState',
        'Refactor your code to use setState instead (see ' +
          'https://github.com/facebook/react/issues/3236).'
      ]
    };
    var defineDeprecationWarning = function(methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function() {
          lowPriorityWarning$1(
            false,
            '%s(...) is deprecated in plain JavaScript React classes. %s',
            info[0],
            info[1]
          );
          return undefined;
        }
      });
    };
    for (var fnName in deprecatedAPIs) {
      if (deprecatedAPIs.hasOwnProperty(fnName)) {
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
    }
  }

  function ComponentDummy() {}
  ComponentDummy.prototype = Component.prototype;

  /**
   * 带有SCU默认浅相等检查的便利组件。
   *
   * @param {*} props
   * @param {*} context
   * @param {*} updater
   */
  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  var PureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
  PureComponentPrototype.constructor = PureComponent;
  // 避免对这些方法进行额外的原型跳转。
  objectAssign(PureComponentPrototype, Component.prototype);
  PureComponentPrototype.isPureReactComponent = true;

  // 具有单个可变值的不可变对象
  function createRef() {
    var refObject = {
      current: null
    };
    {
      Object.seal(refObject);
    }
    return refObject;
  }

  var enableSchedulerDebugging = false;

  // TODO: Use symbols?
  var ImmediatePriority = 1;
  var UserBlockingPriority = 2;
  var NormalPriority = 3;
  var LowPriority = 4;
  var IdlePriority = 5;

  // Max 31 bit integer. The max integer size in V8 for 32-bit systems.
  // Math.pow(2, 30) - 1
  // 0b111111111111111111111111111111
  var maxSigned31BitInt = 1073741823;

  // Times out immediately
  var IMMEDIATE_PRIORITY_TIMEOUT = -1;
  // Eventually times out
  var USER_BLOCKING_PRIORITY = 250;
  var NORMAL_PRIORITY_TIMEOUT = 5000;
  var LOW_PRIORITY_TIMEOUT = 10000;
  // Never times out
  var IDLE_PRIORITY = maxSigned31BitInt;

  // Callbacks are stored as a circular, doubly linked list.
  var firstCallbackNode = null;

  var currentDidTimeout = false;
  // Pausing the scheduler is useful for debugging.
  var isSchedulerPaused = false;

  var currentPriorityLevel = NormalPriority;
  var currentEventStartTime = -1;
  var currentExpirationTime = -1;

  // This is set when a callback is being executed, to prevent re-entrancy.
  var isExecutingCallback = false;

  var isHostCallbackScheduled = false;

  // 前端性能监控的api
  var hasNativePerformanceNow =
    typeof performance === 'object' && typeof performance.now === 'function';

  function ensureHostCallbackIsScheduled() {
    if (isExecutingCallback) {
      // 现在不要安排工作；等到下一次我们让步为止。
      return;
    }
    // 使用列表中最早的过期时间安排主机回调。
    var expirationTime = firstCallbackNode.expirationTime;
    if (!isHostCallbackScheduled) {
      isHostCallbackScheduled = true;
    } else {
      // 取消已经存在的主机回调
      cancelHostCallback();
    }
    requestHostCallback(flushWork, expirationTime);
  }
  function flushFirstCallback() {
    var flushedNode = firstCallbackNode;
    //在调用回调之前从列表中移除节点。这样的话,即使回调引发，列表也处于一致状态。
    var next = firstCallbackNode.next;
    // 如果当前节点和下一次的节点一致,firstCallbackNode=null
    if (firstCallbackNode === next) {
      // 在列表中这是上一次的回调
      firstCallbackNode = null;
      next = null;
    } else {
      // 不一致,上一次节点等于firstCallbackNode的上一个节点,firstCallbackNode等于lastCallbackNode的下一个节点,链表结构
      var lastCallbackNode = firstCallbackNode.previous;
      firstCallbackNode = lastCallbackNode.next = next;
      next.previous = lastCallbackNode;
    }
    flushedNode.next = flushedNode.previous = null;

    // 现在 它是安全的回调
    var callback = flushedNode.callback;
    var expirationTime = flushedNode.expirationTime;
    var priorityLevel = flushedNode.priorityLevel;
    var previousPriorityLevel = currentPriorityLevel;
    var previousExpirationTime = currentExpirationTime;
    currentPriorityLevel = priorityLevel;
    currentExpirationTime = expirationTime;
    var continuationCallback;
    try {
      continuationCallback = callback();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
      currentExpirationTime = previousExpirationTime;
    }

    // 一个回调可能会返回一个连续的节点。连续性应按计划进行。以同样的优先顺序和到期作为刚刚完成的回调。
    if (typeof continuationCallback === 'function') {
      var continuationNode = {
        callback: continuationCallback,
        priorityLevel: priorityLevel,
        expirationTime: expirationTime,
        next: null,
        previous: null
      };
      // 将新回调插入到列表中，并按其过期时间排序。这是几乎与“scheduleCallback”中的代码相同，除了回调插入到列表*before*相同到期回调之前插入之后。
      if (firstCallbackNode === null) {
        // 这是列表中的第一个回调
        firstCallbackNode = continuationNode.next = continuationNode.previous = continuationNode;
      } else {
        var nextAfterContinuation = null;
        var node = firstCallbackNode;
        do {
          if (node.expirationTime >= expirationTime) {
            // 此回调将在继续时或之后过期。我们将插入连续的节点在此回调之前。
            nextAfterContinuation = node;
            break;
          }
          node = node.next;
        } while (node !== firstCallbackNode);
        {
          if (nextAfterContinuation === null) {
            // 找不到相同或较低优先级的回调，这意味着回调是列表中优先级最低的回调。
            nextAfterContinuation = firstCallbackNode;
          } else if (nextAfterContinuation === continuationNode) {
            // 这个新的回调在列表中是最高优先级的
            firstCallbackNode = continuationNode;
          }
          var previous = nextAfterContinuation.previous;
          previous.next = nextAfterContinuation.previous = continuationNode;
          continuationNode.next = nextAfterContinuation;
          continuationNode.previous = previous;
        }
      }
    }
  }

  function flushImmediateWork() {
    if (
      // 确信我们已经已退出最外部的事件处理程序
      currentEventStartTime === -1 &&
      firstCallbackNode !== null &&
      firstCallbackNode.priorityLevel === ImmediatePriority
    ) {
      isExecutingCallback = true;
      try {
        do {
          flushFirstCallback();
        } while (
          // 继续刷新，直到没有更多的即时回调
          firstCallbackNode !== null &&
          firstCallbackNode.priorityLevel === ImmediatePriority
        );
      } finally {
        isExecutingCallback = false;
        if (firstCallbackNode !== null) {
          // 还有工作要做。请求另一个回调。
          ensureHostCallbackIsScheduled();
        } else {
          isHostCallbackScheduled = false;
        }
      }
    }
  }

  function flushWork(didTimeout) {
    // 如果当前暂停，请立即退出
    if (enableSchedulerDebugging && isSchedulerPaused) {
      return;
    }
    isExecutingCallback = true;
    var previousDidTimeout = currentDidTimeout;
    currentDidTimeout = didTimeout;
    try {
      if (didTimeout) {
        // 刷新所有过期的回调而不顺从。
        while (
          firstCallbackNode !== null &&
          !(enableSchedulerDebugging && isSchedulerPaused)
        ) {
          // TODO在功能标志中换行
          // 读取当前时间。清除在或到期的所有回调比那时候早。然后再次读取当前时间并重复。
          // 这样优化的性能越少。现在调用越少越好。
          var currentTime = getCurrentTime();
          if (firstCallbackNode.expirationTime <= currentTime) {
            do {
              flushFirstCallback();
            } while (
              firstCallbackNode !== null &&
              firstCallbackNode.expirationTime <= currentTime &&
              !(enableSchedulerDebugging && isSchedulerPaused)
            );
            continue;
          }
          break;
        }
      } else {
        // 一直刷新回调，直到帧中的时间用完。
        if (firstCallbackNode !== null) {
          do {
            if (enableSchedulerDebugging && isSchedulerPaused) {
              break;
            }
            flushFirstCallback();
          } while (firstCallbackNode !== null && !shouldYieldToHost());
        }
      }
    } finally {
      isExecutingCallback = false;
      currentDidTimeout = previousDidTimeout;
      if (firstCallbackNode !== null) {
        // 还有工作要做。请求另一个回调。
        ensureHostCallbackIsScheduled();
      } else {
        isHostCallbackScheduled = false;
      }
      // 退出前，刷新计划的所有即时工作。
      flushImmediateWork();
    }
  }
  function unstable_next(eventHandler) {
    var priorityLevel = void 0;
    switch (currentPriorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
        // Shift down to normal priority
        priorityLevel = NormalPriority;
        break;

      default:
        // 任何低于正常优先级的内容都应保持在当前级别。
        priorityLevel = currentPriorityLevel;
        break;
    }
    var previousPriorityLevel = currentPriorityLevel;
    var previousEventStartTime = currentEventStartTime;
    currentPriorityLevel = priorityLevel;
    currentEventStartTime = getCurrentTime();

    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
      currentEventStartTime = previousEventStartTime;

      // Before exiting, flush all the immediate work that was scheduled.
      flushImmediateWork();
    }
  }

  function unstable_wrapCallback(params) {
    var parentPriorityLevel = currentPriorityLevel;
    return function() {
      // This is a fork of runWithPriority, inlined for performance.
      var previousPriorityLevel = currentPriorityLevel;
      var previousEventStartTime = currentEventStartTime;
      currentPriorityLevel = parentPriorityLevel;
      currentEventStartTime = getCurrentTime();

      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
        currentEventStartTime = previousEventStartTime;
        flushImmediateWork();
      }
    };
  }

  function unstable_scheduleCallback(callback, deprecated_options) {
    var startTime =
      currentEventStartTime !== -1 ? currentEventStartTime : getCurrentTime();

    var expirationTime;
    if (
      typeof deprecated_options === 'object' &&
      deprecated_options !== null &&
      typeof deprecated_options.timeout === 'number'
    ) {
      // Fixme：一旦我们解除了失效时间的反应，就移除这个分支。
      expirationTime = startTime + deprecated_options.timeout;
    } else {
      switch (currentPriorityLevel) {
        case ImmediatePriority:
          expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
          break;
        case UserBlockingPriority:
          expirationTime = startTime + USER_BLOCKING_PRIORITY;
          break;
        case IdlePriority:
          expirationTime = startTime + IDLE_PRIORITY;
          break;
        case LowPriority:
          expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
          break;
        case NormalPriority:
        default:
          expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
      }
    }

    var newNode = {
      callback: callback,
      priorityLevel: currentPriorityLevel,
      expirationTime: expirationTime,
      next: null,
      previous: null
    };
    // 在列表中插入新的回调,首先按照过期时间排序,然后插入.因此新的回调被插入在其他回调与过期时间一致
    if (firstCallbackNode === null) {
      // This is the first callback in the list.
      firstCallbackNode = newNode.next = newNode.previous = newNode;
      ensureHostCallbackIsScheduled();
    } else {
      var next = null;
      var node = firstCallbackNode;
      do {
        if (node.expirationTime > expirationTime) {
          // The new callback expires before this one.
          next = node;
          break;
        }
        node = node.next;
      } while (node !== firstCallbackNode);

      if (next === null) {
        // No callback with a later expiration was found, which means the new
        // callback has the latest expiration in the list.
        next = firstCallbackNode;
      } else if (next === firstCallbackNode) {
        // The new callback has the earliest expiration in the entire list.
        firstCallbackNode = newNode;
        ensureHostCallbackIsScheduled();
      }

      var previous = next.previous;
      previous.next = next.previous = newNode;
      newNode.next = next;
      newNode.previous = previous;
    }

    return newNode;
  }

  function unstable_pauseExecution() {
    isSchedulerPaused = true;
  }
  function unstable_continueExecution() {
    isSchedulerPaused = false;
    if (firstCallbackNode !== null) {
      ensureHostCallbackIsScheduled();
    }
  }

  function unstable_getFirstCallbackNode() {
    return firstCallbackNode;
  }
  function unstable_cancelCallback(callbackNode) {
    var next = callbackNode.next;
    if (next === null) {
      // 已取消。
      return;
    }
    if (next === callbackNode) {
      // 这仅仅是计划的回调。清除列表。
      firstCallbackNode = null;
    } else {
      // 在列表中的从他的位置移除回调
      if (callbackNode === firstCallbackNode) {
        firstCallbackNode = next;
      }
      var previous = callbackNode.previous;
      previous.next = next;
      next.previous = previous;
    }
    callbackNode.next = callbackNode.previous = null;
  }

  function unstable_getCurrentPriorityLevel() {
    return currentPriorityLevel;
  }
  function unstable_shouldYield() {
    return (
      !currentDidTimeout &&
      ((firstCallbackNode !== null &&
        firstCallbackNode.expirationTime < currentExpirationTime) ||
        shouldYieldToHost())
    );
  }

  // 剩下的代码本质上是requestIdleCallback的polyfill。它通过调度RequestAnimationFrame工作，存储开始时间 然后调度一个在绘制之后调度的后期消息。 在postmessage处理程序中，在time+frame之前尽可能多地执行工作 速率。通过将空闲调用分隔为单独的事件标记，我们可以确保 布局、绘制和其他浏览器工作将根据可用时间进行计数。 帧速率是动态调整的。
  //我们捕获对任何全局的本地引用，以防在本模块初步评估。我们想用实施一致。
  var localDate = Date;
  // 如果组件只导入reactdom（例如，对于finddomnode）此初始化代码甚至可以在服务器环境中运行。某些环境可能不会设置超时或清除超时。然而，我们总是期望他们被定义在客户机上。https://github.com/facebook/react/pull/13088
  var localSetTimeout =
    typeof setTimeout === 'function' ? setTimeout : undefined;
  var localClearTimeout =
    typeof clearTimeout === 'function' ? clearTimeout : undefined;

  // 我们不希望其中任何一个被定义，但是我们会出错如果他们在客户机上丢失了。
  var localRequestAnimationFrame =
    typeof requestAnimationFrame === 'function'
      ? requestAnimationFrame
      : undefined;
  var localCancelAnimationFrame =
    typeof cancelAnimationFrame === 'function'
      ? cancelAnimationFrame
      : undefined;

  var getCurrentTime;
  // 当选项卡位于后台时，RequestAnimationFrame不运行。如果我们有背景，我们更希望这项工作能够发生，这样页面继续在后台加载。所以我们也安排了一个“设置时间”作为回退。
  // TODO：需要一个更好的启发式的背景工作。
  var ANIMATION_FRAME_TIMEOUT = 100;
  var rAFID;
  var rAFTimeoutID;
  var requestAnimationFrameWithTimeout = function(callback) {
    // 计划RAF，同时设置一个定时器
    rAFID = localRequestAnimationFrame(function(timestamp) {
      // 取消定时器setTimeout
      localClearTimeout(rAFTimeoutID);
      callback(timestamp);
    });
    rAFTimeoutID = localSetTimeout(function() {
      // 取消 requestAnimationFrame
      localCancelAnimationFrame(rAFID);
      callback(getCurrentTime());
    }, ANIMATION_FRAME_TIMEOUT);
  };
  if (hasNativePerformanceNow) {
    var Performance = performance;
    getCurrentTime = function() {
      return Performance.now();
    };
  } else {
    getCurrentTime = function() {
      return localDate.now();
    };
  }
  var requestHostCallback;
  var cancelHostCallback;
  var shouldYieldToHost;

  var globalValue = null;
  if (typeof window !== 'undefined') {
    globalValue = window;
  } else if (typeof global !== 'undefined') {
    globalValue = global;
  }

  if (globalValue && globalValue._schedMock) {
    // 动态注入，仅用于测试目的。
    var globalImpl = globalValue._schedMock;
    requestHostCallback = globalImpl[0];
    cancelHostCallback = globalImpl[1];
    shouldYieldToHost = globalImpl[2];
    getCurrentTime = globalImpl[3];
  } else if (
    // 如果任务管理运行在没有dom的环境,它又回到了天真使用SetTimeout实现。
    typeof window === 'undefined' ||
    // 检查是否也支持信息管道。
    typeof MessageChannel !== 'undefined'
  ) {
    // 如果在非浏览器环境中意外导入，例如javascriptcore，
    // 回退到原生的实现。
    var _callback = null;
    var _flushCallback = function(didTimeout) {
      if (_callback !== null) {
        try {
          _callback(didTimeout);
        } finally {
          _callback = null;
        }
      }
    };
    requestHostCallback = function(cb, ms) {
      if (_callback !== null) {
        // 防止再进入。
        setTimeout(requestHostCallback, 0, cb);
      } else {
        _callback = cb;
        setTimeout(_flushCallback, 0, false);
      }
    };
    cancelHostCallback = function() {
      _callback = null;
    };
    shouldYieldToHost = function() {
      return false;
    };
  } else {
    if (typeof console !== 'undefined') {
      // 移除fb.me like
      if (typeof localRequestAnimationFrame !== 'function') {
        console.error(
          "This browser doesn't support requestAnimationFrame. " +
            'Make sure that you load a ' +
            'polyfill in older browsers. https://fb.me/react-polyfills'
        );
      }
      if (typeof localCancelAnimationFrame !== 'function') {
        console.error(
          "This browser doesn't support cancelAnimationFrame. " +
            'Make sure that you load a ' +
            'polyfill in older browsers. https://fb.me/react-polyfills'
        );
      }
    }
  }
  var scheduledHostCallback = null;
  var isMessageEventScheduled = false;
  var timeoutTime = -1;

  var isAnimationFrameScheduled = false;

  var isFlushingHostCallback = false;

  var frameDeadline = 0;
  // 我们开始假设我们以30fps的速度运行，但随后启发式跟踪
  // 如果我们得到更频繁的动画，会将该值调整为更快的fps帧。
  var previousFrameTime = 33;
  var activeFrameTime = 33;

  shouldYieldToHost = function() {
    return frameDeadline <= getCurrentTime();
  };

  // 我们使用postMessage技巧将空闲工作推迟到重新喷漆之后。
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = function(event) {
    isMessageEventScheduled = false;

    var prevScheduledCallback = scheduledHostCallback;
    var prevTimeoutTime = timeoutTime;
    scheduledHostCallback = null;
    timeoutTime = -1;

    var currentTime = getCurrentTime();

    var didTimeout = false;

    if (frameDeadline - currentTime <= 0) {
      // 在这段空闲时间里没有时间了。检查回调是否超时和是否已超出。
      if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
        // 超时。调用回调，即使没有还有时间。
        didTimeout = true;
      } else {
        // 没有超时
        if (!isAnimationFrameScheduled) {
          // 安排另一个动画回调，以便稍后重试。
          isAnimationFrameScheduled = true;
          requestAnimationFrameWithTimeout(animationTick);
        }
        // 退出而不调用回调。
        scheduledHostCallback = prevScheduledCallback;
        timeoutTime = prevTimeoutTime;
        return;
      }
    }

    if (prevScheduledCallback !== null) {
      isFlushingHostCallback = true;
      try {
        prevScheduledCallback(didTimeout);
      } finally {
        isFlushingHostCallback = false;
      }
    }
  };

  var animationTick = function(rafTime) {
    if (scheduledHostCallback !== null) {
      // 在帧开始之前。如果调度程序队列在帧末尾不是空的，则将继续在该回调内刷新。如果队列为空，然后它会立即退出。在开始时发布回调帧确保它在最早可能的帧内被激发。如果我们等到帧结束后再发布回调，我们就冒着浏览器跳过帧，直到帧之后。
      requestAnimationFrameWithTimeout(animationTick);
    } else {
      // 无等待工作。退出
      isAnimationFrameScheduled = false;
      return;
    }

    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    if (
      nextFrameTime < activeFrameTime &&
      previousFrameTime < activeFrameTime
    ) {
      if (nextFrameTime < 8) {
        // 防御性编码。我们不支持高于120Hz的帧速率。如果计算的帧时间小于8，则可能是错误。
        nextFrameTime = 8;
      }
      // 如果一帧变长，那么下一帧可能变短以赶上。
      // 如果两帧连成一行，那么这就表明我们实际上，它的帧速率比我们目前正在优化的要高。我们相应地动态调整启发式。例如，如果我们在120Hz显示器或90Hz VR显示器上运行。取两个最大值，以防其中一个由于错过帧最后期限。
      activeFrameTime =
        nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
      previousFrameTime = nextFrameTime;
    }
    frameDeadline = rafTime + activeFrameTime;
    if (!isMessageEventScheduled) {
      isMessageEventScheduled = true;
      port.postMessage(undefined);
    }
  };

  requestHostCallback = function(callback, absoluteTimeout) {
    scheduledHostCallback = callback;
    timeoutTime = absoluteTimeout;
    if (isFlushingHostCallback || absoluteTimeout < 0) {
      // 不要等待下一帧。在新事件中，尽快继续工作。
      port.postMessage(undefined);
    } else if (!isAnimationFrameScheduled) {
      // 如果rAF还没调度一个，我们需要调度一个帧。
      // TODO:如果这个rAF没有实现，因为浏览器堵塞，我们可能还希望将setTimeout触发器RIC作为备份，以确保我们继续工作。
      isAnimationFrameScheduled = true;
      requestAnimationFrameWithTimeout(animationTick);
    }
  };
  cancelHostCallback = function() {
    scheduledHostCallback = null;
    isMessageEventScheduled = false;
    timeoutTime = -1;
  };
});
