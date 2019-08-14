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
  }
  // 帮助识别开始阶段生命周期挂钩和设置状态reducers中的副作用：
  // 在某些情况下，strictmode还应双倍渲染生命周期。但是，对于测试来说，这可能会令人困惑， 而且它可能对生产性能不利。此功能标志可用于控制行为：
  // 为了保留调试器的“捕获异常时暂停”行为，我们在invokeguardCallback内重播失败组件的开始阶段。
  // 警告不推荐使用的异步不安全生命周期；与RFC 6相关：
  // 收集探查器子树的高级计时度量。
  // 跟踪触发每次提交的交互。

  var enableSchedulerTracing = true;
  // Only used in www builds.
  // TODO: true? Here it might just be false.

  // Only used in www builds.

  // Only used in www builds.
  // react fire：防止值和选中的属性同步及其相关的DOM属性
  // 在即将到来的16.7版本中，这些API将不再是“不稳定的”，
  // 使用一个标志来控制此行为，以同时支持16.6个小版本。
  var enableStableConcurrentModeAPIs = false;

  var DEFAULT_THREAD_ID = 0;

  // 用于生成唯一ID的计数器。
  var interactionIDCounter = 0;
  var threadIDCounter = 0;
  // 一组当前跟踪的交互。
  //交互“stack”–
  // 表示新跟踪的交互被附加到以前的活动集。
  // 当交互超出范围时，将恢复上一组（如果有）。
  var interactionsRef = null;
  // 有点像发布订阅模式
  // 监听者通知交互何时开始和结束。
  var subscriberRef = null;

  if (enableSchedulerTracing) {
    interactionsRef = {
      current: new Set()
    };
    subscriberRef = {
      current: null
    };
  }
  function unstable_clear(callback) {
    if (!enableSchedulerTracing) {
      return callback();
    }
    var prevInteractions = interactionsRef.current;
    interactionsRef.current = new Set();
    try {
      return callback();
    } finally {
      interactionsRef.current = prevInteractions;
    }
  }
  function unstable_getCurrent() {
    if (!enableSchedulerTracing) {
      return null;
    } else {
      return interactionsRef.current;
    }
  }
  function unstable_getThredId() {
    return ++threadIDcounter;
  }
  function unstable_trace(name, timestamp, callback) {
    var threadID =
      arguments.length > 3 && arguments[3] !== undefined
        ? arguments[3]
        : DEFAULT_THREAD_ID;
    if (!enableSchedulerTracing) {
      return callback();
    }
    var interaction = {
      __count: 1,
      id: interactionIDCounter++,
      name: name,
      timestamp: timestamp
    };
    var prevInteractions = interactionsRef.current;
    // 跟踪的交互应该堆叠/累积。
    // 为此，克隆当前交互。
    // 完成后将恢复上一组。
    var interactions = new Set(prevInteractions);
    interactions.add(interaction);
    interactionsRef.current = interactions;

    var subscriber = subscriberRef.current;
    var returnValue = void 0;
    try {
      if (subscriber !== null) {
        subscriber.onInteractionTraced(interaction);
      }
    } finally {
      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(interactions, threadID);
        }
      } finally {
        try {
          returnValue = callback();
        } finally {
          interactionsRef.current = prevInteractions;
          try {
            if (subscriber !== null) {
              subscriber.onWorkStopped(interactions, threadID);
            }
          } finally {
            interaction.__count--;
            // 如果没有为此交互安排异步工作，
            // 通知订阅发布者它已完成。
            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          }
        }
      }
    }
    return returnValue;
  }

  function unstable_wrap(callback) {
    var threadID =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : DEFAULT_THREAD_ID;
    if (!enableSchedulerTracing) {
      return callback;
    }
    var wrappedInterations = interactionsRef.current;

    var subscriber = subscriberRef.current;
    if (subscriber !== null) {
      subscriber.onWorkScheduled(wrappedInterations, threadID);
    }

    // 更新当前交互的挂起异步工作计数。
    // 出错时调用订阅服务器后更新。
    wrappedInterations.forEach(function(interaction) {
      interaction.__count++;
    });

    var hasRun = false;

    function wrapped() {
      var prevInteractions = interactionsRef.current;
      interactionsRef.current = wrappedInterations;

      subscriber = subscriberRef.current;

      try {
        var returnValue = void 0;
        try {
          if (subscriber !== null) {
            subscriber.onWorkStarted(wrappedInterations, threadID);
          }
        } finally {
          try {
            returnValue = callback.apply(undefined, arguments);
          } finally {
            interactionsRef.current = prevInteractions;

            if (subscriber !== null) {
              subscriber.onWorkStopped(wrappedInterations, threadID);
            }
          }
        }
        return returnValue;
      } finally {
        if (!hasRun) {
          // 我们只希望一个被包装的函数执行一次，
          // 但如果执行多于一次,只减少一次未完成的交互计数。
          hasRun = true;

          // 为所有打包的交互更新挂起的异步计数。
          // 如果这是其中任何一个的最后一次调度异步工作，
          // 将它们标记为已完成。
          wrappedInterations.forEach(function(interaction) {
            interaction.__count--;
            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          });
        }
      }
    }
    wrapped.cancel = function cancel() {
      subscriber = subscriberRef.current;
      try {
        if (subscriber !== null) {
          subscriber.onWorkCancel(wrappedInterations, threadID);
        }
      } finally {
        // 为所有打包的交互更新挂起的异步计数。
        // 如果这是其中任何一个的最后一次计划异步工作，
        // 将它们标记为已完成。
        wrappedInteractions.forEach(function(interaction) {
          interaction.__count--;

          if (subscriber && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        });
      }
    };

    return wrapped;
  }

  var subscribers = null;
  if (enableSchedulerTracing) {
    subscribers = new Set();
  }
  function unstable_subscribe(subscriber) {
    if (enableSchedulerTracing) {
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        subscriberRef.current = {
          onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
          onInteractionTraced: onInteractionTraced,
          onWorkCanceled: onWorkCanceled,
          onWorkScheduled: onWorkScheduled,
          onWorkStarted: onWorkStarted,
          onWorkStopped: onWorkStopped
        };
      }
    }
  }
  function unstable_unsubscribe(subscriber) {
    if (enableSchedulerTracing) {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        subscriberRef.current = null;
      }
    }
  }

  function onInteractionTraced(interaction) {
    var didCatchError = false;
    var caughtError = null;

    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onInteractionTraced(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onInteractionScheduledWorkCompleted(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onInteractionScheduledWorkCompleted(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }
  function onWorkScheduled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;

    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onWorkScheduled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStarted(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;

    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onWorkStarted(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStopped(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;

    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onWorkStopped(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkCanceled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;

    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onWorkCanceled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  /**
   * 跟踪当前所有者。
   * 当前所有者是应该拥有以下任何组件的组件目前正在建设中。
   */
  var ReactCurrentOwner = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null
  };

  var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

  var describeComponentFrame = function(name, source, ownerName) {
    var sourceInfo = '';
    if (source) {
      var path = source.fileName;
      var fileName = path.replace(BEFORE_SLASH_RE, '');
      {
        // 在dev中，包括用于常见特殊情况的代码：
        // 首选“folder/index.js”而不是“index.js”。
        if (/^index\./.text(fileName)) {
          var match = path.match(BEFORE_SLASH_RE);
          if (match) {
            var pathBeforeSlash = match[1];
            if (pathBeforeSlash) {
              var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
              fileName = folderName + '/' + fileName;
            }
          }
        }
      }
      sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
    } else if (ownerName) {
      sourceInfo = ' (created by ' + ownerName + ')';
    }
    return '\n    in ' + (name || 'Unknown') + sourceInfo;
  };

  var Resolved = 1;

  function refineResolvedLazyComponent(lazyComponent) {
    return (lazyComponent._status = Resolved ? lazyComponent._result : null);
  }

  function getWrappedName(outerType, innerType, wrapperName) {
    var functionName = innerType.displayName || innerType.name || '';
    return (
      outerType.displayName ||
      (functionName !== ''
        ? wrapperName + '(' + functionName + ')'
        : wrapperName)
    );
  }

  function getComponent(type) {
    if (type === null) {
      // 主机根,文本节点或只是类型无效。
      return null;
    }
    {
      if (typeof type.tag === 'number') {
        warningWithoutStack$1(
          false,
          'Received an unexpected object in getComponentName(). ' +
            'This is likely a bug in React. Please file an issue.'
        );
      }
    }
    if (typeof type === 'string') {
      return type;
    }
    switch (type) {
      case REACT_CONCURRENT_MODE_TYPE:
        return 'ConcurrentMode';
      case REACT_FRAGMENT_TYPE:
        return 'Fragment';
      case REACT_PORTAL_TYPE:
        return 'Portal';
      case REACT_PROFILER_TYPE:
        return 'Profiler';
      case REACT_STRICT_MODE_TYPE:
        return 'StrictMode';
      case REACT_SUSPENSE_TYPE:
        return 'Suspense';
    }

    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          return 'Context.Consumer';
        case REACT_PROVIDER_TYPE:
          return 'Context.Provider';
        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, 'ForwardRef');
        case REACT_MEMO_TYPE:
          return getComponentName(type.type);
        case REACT_LAZY_TYPE: {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);
          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }
        }
      }
    }
    return null;
  }

  var ReactDebugCurrentFrame = {};
  var currentlyValidatingElement = null;

  function setCurrentlyValidatingElement(element) {
    {
      currentlyValidatingElement = element;
    }
  }

  {
    // 当前渲染器注入的堆栈实现。
    ReactDebugCurrentFrame.getCurrentStack = null;
    ReactDebugCurrentFrame.getStackAddendum = function() {
      var stack = '';
      // 在验证元素时添加额外的顶框
      if (currentlyValidatingElement) {
        var name = getComponentName(currentlyValidatingElement.type);
        var owner = currentlyValidatingElement._owner;
        stack += describeComponentFrame(
          name,
          currentlyValidatingElement._source,
          owner && getComponentName(owner.type)
        );
      }

      // 委托给特定于注入渲染器的实现
      var impl = ReactDebugCurrentFrame.getCurrentStack;
      if (impl) {
        stack += impl() || '';
      }
      return stack;
    };
  }

  var ReactSharedInternals = {
    ReactcurrentDispatcher: ReactcurrentDispatcher,
    ReactCurrentOwner: ReactCurrentOwner,
    // 由渲染器使用，以避免在UMD包中两次绑定对象分配：
    assign: objectAssign
  };

  {
    // 重新导出UMD包的计划API。
    // 这避免了在小更新中引入对新UMD全局的依赖， 因为这将是一个破坏性的更改（例如，对于所有现有的代码沙盒）。 此再出口仅适用于UMD捆绑包；
    // CJS包使用共享的NPM包。
    objectAssign(ReactSharedInternals, {
      Scheduler: {
        unstable_cancelCallback: unstable_cancelCallback,
        unstable_shouldYield: unstable_shouldYield,
        unstable_now: getCurrentTime,
        unstable_scheduleCallback: unstable_scheduleCallback,
        unstable_runWithPriority: unstable_runWithPriority,
        unstable_next: unstable_next,
        unstable_wrapCallback: unstable_wrapCallback,
        unstable_getFirstCallbackNode: unstable_getFirstCallbackNode,
        unstable_pauseExecution: unstable_pauseExecution,
        unstable_continueExecution: unstable_continueExecution,
        unstable_getCurrentPriorityLevel: unstable_getCurrentPriorityLevel,
        unstable_IdlePriority: IdlePriority,
        unstable_ImmediatePriority: ImmediatePriority,
        unstable_LowPriority: LowPriority,
        unstable_NormalPriority: NormalPriority,
        unstable_UserBlockingPriority: UserBlockingPriority
      },
      SchedulerTracing: {
        __interactionsRef: interactionsRef,
        __subscriberRef: subscriberRef,
        unstable_clear: unstable_clear,
        unstable_getCurrent: unstable_getCurrent,
        unstable_getThreadID: unstable_getThreadID,
        unstable_subscribe: unstable_subscribe,
        unstable_trace: unstable_trace,
        unstable_unsubscribe: unstable_unsubscribe,
        unstable_wrap: unstable_wrap
      }
    });
  }

  {
    objectAssign(ReactSharedInternals, {
      // 这些不需要被包含在生成环境
      ReactDebugCurrentFrame: ReactDebugCurrentFrame,
      // react dom 16.0.0的垫片仍然破坏（但未使用）。
      // TODO: remove in React 17.0.
      ReactComponentTreeHook: {}
    });
  }

  /**
   * 类似于不变量，但仅在不满足条件时记录警告。
   * 这可用于在关键的开发环境中记录问题路径。删除生产环境的日志代码将保留相同的逻辑，遵循相同的代码路径。
   */

  var warning = warningWithoutStack$1;

  {
    warning = function(condition, format) {
      if (condition) {
        return;
      }
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      for (
        var _len = arguments.length,
          args = Array(_len > 2 ? _len - 2 : 0),
          _key = 2;
        _key < _len;
        _key++
      ) {
        args[_key - 2] = arguments[_key];
      }
      warningWithoutStack$1.apply(
        undefined,
        [false, format + '%s'].concat(args, [stack])
      );
    };
  }
  var warning$1 = warning;

  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };

  var specialPropKeyWarningShown = void 0;
  var specialPropRefWarningShown = void 0;

  function hasValidRef(config) {
    {
      if (hasOwnProperty$1.call(config, 'ref')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
        if (getter && getter.isReacWarning) {
          return false;
        }
      }
    }
    return config.ref !== undefined;
  }

  function hasValidKey(config) {
    {
      if (hasOwnProperty$1.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }
    return config.key !== undefined;
  }

  function defineKeyPropWarningGetter(props, displayName) {
    var warnAboutAccessingKey = function() {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        warningWithoutStack$1(
          false,
          '%s: `key` is not a prop. Trying to access it will result ' +
            'in `undefined` being returned. If you need to access the same ' +
            'value within the child component, you should pass it as a different ' +
            'prop. (https://fb.me/react-special-props)',
          displayName
        );
      }
    };
    warnAboutAccessingKey.isReacWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }

  function defineRefPropWarningGetter(props, displayName) {
    var warnAboutAccessingRef = function() {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        warningWithoutStack$1(
          false,
          '%s: `ref` is not a prop. Trying to access it will result ' +
            'in `undefined` being returned. If you need to access the same ' +
            'value within the child component, you should pass it as a different ' +
            'prop. (https://fb.me/react-special-props)',
          displayName
        );
      }
    };
    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }

  /**
   * 创建新的react元素的工厂方法。这不再坚持类模式，因此不要使用new来调用它。另外，没有检查实例会有用的。相反，根据symbol.for（“react.element”）测试$$typeof字段以进行检查
   * 如果某物是反应元素。
   * * @param {*} type
   * @param {*} key
   * @param {string|object} ref
   * @param {*} self 用于检测“this”所在位置的*临时*助手与调用react.createElement时的“owner”不同，因此 可以发出警告。我们要去掉所有者并用箭头替换字符串'ref's函数，只要“this”和“owner”相同，就不会有行为改变。
   * @param {*} source 注释对象（由蒸腾器或其他添加）指示文件名、行号和/或其他信息。
   * @param {*} owner
   * @param {*} props
   * @internal
   */
  var ReactElement = function(type, key, ref, self, source, owner, props) {
    var element = {
      // 这个标签允许我们唯一地将它标识为一个React元素。
      $$typeof: REACT_ELEMENT_TYPE,

      // 属于元素的内置属性
      type: type,
      key: key,
      ref: ref,
      props: props,

      // 记录负责创建此元素的组件。
      _owner: owner
    };
    {
      // 验证标志当前是可变的。我们穿上它外部后备存储器，以便我们冻结整个对象。一旦在常用的开发环境中,实现了weakmap，就可以将其替换为weakmap。
      element._store = {};

      // 为了使比较React组件更容易进行测试，我们使验证标志不可枚举（如果可能，应该包括我们在其中运行测试的每个环境），因此测试框架忽略它。
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });

      // self和source是仅适用于开发人员的属性。
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });

      // 应考虑在两个不同位置创建的两个元素在测试中是相等的，因此我们隐藏它以避免枚举。
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
      if (Object.freeze) {
        Object.freeze(element.props);
        Object.freeze(element);
      }
    }
    return element;
  };

  /**
   * 创建并返回给定类型的新ReactElement。
   * See https://reactjs.org/docs/react-api.html#createelement
   */

  function createElement(type, config, children) {
    var propName = void 0;

    //  提取保留名称
    var props = {};

    var key = null;
    var ref = null;
    var self = null;
    var source = null;

    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
      }
      if (hasValidKey(config)) {
        key = '' + config.key;
      }
      self = config.__self === undefined ? null : config.__self;
      souce = config.__source === undefined ? null : config.__source;
      // 剩余属性将添加到新的Props对象中
      for (propName in config) {
        if (
          hasOwnProperty$1.call(config, propName) &&
          !RESERVED_PROPS.hasOwnProperty(propName)
        ) {
          props[propName] = config[propName];
        }
      }
    }
    // 子对象可以是多个参数，而这些参数将转移到新分配的props对象。
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      {
        if (Object.freeze) {
          Object.freeze(childArray);
        }
      }
      props.children = childArray;
    }

    // 解析默认属性
    if (type && type.defineProps) {
      var defaultProps = type.defaultProps;
      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }
    {
      if (key || ref) {
        var displayName =
          typeof type === 'function'
            ? type.displayName || type.name || 'Unknown'
            : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
    return ReactElement(
      type,
      key,
      ref,
      self,
      source,
      ReactCurrentOwner.current,
      props
    );
  }

  /**
   * 返回一个生成给定类型的ReactElements的函数。
   * See https://reactjs.org/docs/react-api.html#createfactory
   */

  function cloneAndReplaceKey(oldElement, newKey) {
    var newElement = ReactElement(
      oldElement.type,
      newKey,
      oldElement.ref,
      oldElement._self,
      oldElement._source,
      oldElement._owner,
      oldElement,
      props
    );
    return newElement;
  }

  /**
   * 克隆并返回一个以元素为起点的新的reactelement。
   * See https://reactjs.org/docs/react-api.html#cloneelement
   */
  function cloneElement(element, config, children) {
    !!(element === null || element === undefined)
      ? invariant(
          false,
          'React.cloneElement(...): The argument must be a React element, but you passed %s.',
          element
        )
      : void 0;

    var propName = void 0;

    // Original props are copied
    var props = objectAssign({}, element.props);

    // 提取保留名称
    var key = element.key;
    var ref = element.ref;

    // 自所有者被保护以来，自我被保护。
    var self = element._self;

    // 由于克隆不太可能被蒸腾器，和原始的来源可能是一个更好的指标真正的所有者。

    var source = element._source;

    // 除非ref被重写，否则将保留所有者
    var owner = element._owner;

    if (config != null) {
      if (hasValidRef(config)) {
        // 悄悄地从父元素那里偷了ref。
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }
      if (hasValidKey(config)) {
        key = '' + config.key;
      }

      // 剩余属性覆盖现有属性

      var defaultProps = void 0;
      if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps;
      }
      for (propName in config) {
        if (
          hasOwnProperty$1.call(config, propName) &&
          !RESERVED_PROPS.hasOwnProperty(propName)
        ) {
          if (config[propName] === undefined && defaultProps !== undefined) {
            // Resolve default props
            props[propName] = defaultProps[propName];
          } else {
            props[propName] = config[propName];
          }
        }
      }
    }

    // 子对象可以是多个参数，而这些参数将转移到新分配的props对象。
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }

    return ReactElement(element.type, key, ref, self, source, owner, props);
  }

  /**
   * 验证对象是否为ReactElement。
   *  See https://reactjs.org/docs/react-api.html#isvalidelement
   * @param {?object} object
   * @return {boolean} True if `object` is a ReactElement.
   * @final
   */
  function isValidElement(object) {
    return (
      typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE
    );
  }

  var SEPARATOR = '.';
  var SUBSEPARATOR = ':';

  /**
   * 转义和包装密钥，以便安全地用作反应
   * @param {string} key to be escaped.
   * @return {string} the escaped key.
   */
  function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
      '-': '=0',
      ':': '=2'
    };
    var escapedString = ('' + key).replace(escapeRegex, function(match) {
      return escaperLookup[match];
    });
    return '$' + escapedString;
  }

  /**
   * TODO: 测试单个子级和具有一个项的数组是否具有相同的键模式。
   */
  var didWarnAboutMap = false;
  var userProvidedKeyEscapedRegex = /\/+/g;
  function escapeUserProvidedKey(text) {
    return ('' + text).replace(userProvidedKeyEscapedRegex, '$&/');
  }

  var POOL_SIZE = 10;
  var traverseContextPool = [];
  function getPooledTraverseContext(
    mapResult,
    keyPrefix,
    mapFunction,
    mapContext
  ) {
    if (traverseContextPool.length) {
      var traverseContext = traverseContextPool.pop();
      traverseContext.result = mapResult;
      traverseContext.keyPrefix = keyPrefix;
      traverseContext.func = mapFunction;
      traverseContext.context = mapContext;
      traverseContext.count = 0;
      return traverseContext;
    } else {
      return {
        result: mapResult,
        keyPrefix: keyPrefix,
        func: mapFunction,
        context: mapContext,
        count: 0
      };
    }
  }

  function releaseTraverseContext(traverseContext) {
    traverseContext.result = null;
    traverseContext.keyPrefix = null;
    traverseContext.func = null;
    traverseContext.context = null;
    traverseContext.count = 0;
    if (traverseContextPool.length < POOL_SIZE) {
      traverseContextPool.push(traverseContext);
    }
  }

  /**
   * @param {?*} children Children tree container.
   * @param {!string} nameSoFar Name of the key path so far.
   * @param {!function} callback Callback to invoke with each child found.
   * @param {?*} traverseContext Used to pass information throughout the traversal
   * process.
   * @return {!number} The number of children in this subtree.
   */
  function traverseAllChildrenImpl(
    children,
    nameSoFar,
    callback,
    traverseContext
  ) {
    var type = typeof children;
    if (type === 'undefined' || type === 'boolean') {
      // 以上都被视为null。
      children = nnull;
    }
    var invokeCallback = false;

    if (children === null) {
      invokeCallback = true;
    } else {
      switch (type) {
        case 'string':
        case 'number':
          invokeCallback = true;
          break;
        case 'object':
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
          }
      }
    }

    if (invokeCallback) {
      callback(
        traverseContext,
        children,
        // 如果它是唯一的子级，则将该名称视为包装在数组中这样，如果子级的数目增加，就一致了。
        nameSoFar === '' ? separator + getcomponentKey(children, 0) : nameSoFar
      );
      return 1;
    }

    var child = void 0;
    var nextName = void 0;
    var subtreeCount = 0; // 在当前子树中找到的子级计数
    var nextNamePrefix = '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getcomponentKey(child, i);
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          callback,
          traverseContext
        );
      }
    } else {
      var iteratorFn = getIteratorFn(children);
      if (typeof iteratorFn === 'function') {
        {
          // 警告将地图用作子项
          if (iteratorFn === children.entries) {
            !didWarnAboutMap
              ? warning$1(
                  false,
                  'Using Maps as children is unsupported and will likely yield ' +
                    'unexpected results. Convert it to a sequence/iterable of keyed ' +
                    'ReactElements instead.'
                )
              : void 0;
            didWarnAboutMaps = true;
          } else if (type === 'object') {
            var addendum = '';
            {
              addendum =
                ' If you meant to render a collection of children, use an array ' +
                'instead.' +
                ReactDebugCurrentFrame.getStackAddendum();
            }
            var childrenString = '' + children;
            invariant(
              false,
              'Objects are not valid as a React child (found: %s).%s',
              childrenString === '[object Object]'
                ? 'object with keys {' + Object.keys(children).join(', ') + '}'
                : childrenString,
              addendum
            );
          }
        }
      }
    }
    return subtreeCount;
  }
  /**
   * 遍历通常指定为“props.children”的子级，但也可以通过属性指定：
   *
   * - `traverseAllChildren(this.props.children, ...)`
   * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
   *
   * “traversecontext”是通过整个遍历。它可以用来存储积累或其他任何回调可能会发现相关。
   *
   * @param {?*} children Children tree object.
   * @param {!function} callback To invoke upon traversing each child.
   * @param {?*} traverseContext Context for traversal.
   * @return {!number} The number of children in this subtree.
   */
  function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0;
    }
    return traverseAllChildrenImpl(children, '', callback, traverseContext);
  }

  /**
   * 生成一个键字符串，用于标识集合中的组件。
   *
   * @param {*} component A component that could contain a manual key.
   * @param {number} index Index that is used if a manual key is not provided.
   * @return {string}
   */
  function getComponentKey(component, index) {
    // 在这里做排版检查，因为我们盲目地称之为排版。我们要确保我们不会阻止未来潜在的ES API。
    if (
      typeof component === 'object' &&
      component !== null &&
      component.key !== null
    ) {
      // 显式键
      return escape(component.key);
    }
    // 由集合中的索引确定的隐式键
    return index.toString(36);
  }

  function forEachSingleChild(bookKeeping, child, name) {
    var func = bookKeeping.func,
      context = bookKeeping.context;

    func.call(context, child, bookKeeping.count++);
  }

  /**
   * 循环访问通常指定为“props.children”的子级。
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} forEachFunc
   * @param {*} forEachContext Context for forEachContext.
   */
  function forEachchildren(children, forEachFunc, forEachContext) {
    if (children == null) {
      return children;
    }
    var traverseContext = getPooledTraverseContext(
      null,
      null,
      forEachFunc,
      forEachContext
    );
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    releaseTraverseContext(traverseContext);
  }

  function mapSingleChildIntoContext(bookKeeping, child, childKey) {
    var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;

    var mappedChild = func.call(context, child, bookKeeping.count++);
    if (Array.isArray(mappedChild)) {
      mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function(c) {
        return c;
      });
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        mappedChild = cloneAndReplaceKey(
          mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix +
            (mappedChild.key && (!child || child.key !== mappedChild.key)
              ? escapeUserProvidedKey(mappedChild.key) + '/'
              : '') +
            childKey
        );
      }
      result.push(mappedChild);
    }
  }

  /**
   * Maps children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenmap
   *
   * The provided mapFunction(child, key, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func The map function.
   * @param {*} context Context for mapFunction.
   * @return {object} Object containing the ordered map of results.
   */
  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  }
  /**
   * Count the number of children that are typically specified as
   * `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrencount
   *
   * @param {?*} children Children tree container.
   * @return {number} The number of children.
   */
  function countChildren(children) {
    return traverseAllChildren(
      children,
      function() {
        return null;
      },
      null
    );
  }

  /**
   * 扁平化子对象（通常指定为“props.children”）和 返回一个具有适当重设键的子级的数组。
   * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
   */
  function toArray(children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, function(child) {
      return child;
    });
    return result;
  }

  /**
   * 返回子集合中的第一个子集合，并在其中验证集合中只有一个子级。
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenonly
   *
   * 此函数的当前实现假定单个子级传递时没有包装，但此助手函数的目的是抽象出儿童的特殊结构。
   * @param {?object} children Child collection structure.
   * @return {ReactElement} The first and only `ReactElement` contained in the
   * structure.
   */
  function onlyChild(children) {
    !isValidElement(children)
      ? invariant(
          false,
          'React.Children.only expected to receive a single React element child.'
        )
      : void 0;
    return children;
  }

  function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    } else {
      {
        !(
          calculateChangedBits === null ||
          typeof calculateChangedBits === 'function'
        )
          ? warningWithoutStack$1(
              false,
              'createContext: Expected the optional second argument to be a ' +
                'function. Instead received: %s',
              calculateChangedBits
            )
          : void 0;
      }
    }
  }

  function lazy(ctor) {
    var lazyType = {
      $$typeof: REACT_LAZY_TYPE,
      _ctor: ctor,
      // react使用这些字段存储结果。
      _status: -1,
      _result: null
    };
    {
      // 在生产中，这只会将其设置在对象上。
      var defaultProps = void 0;
      var propTypes = void 0;
      Object.defineProperties(lazyType, {
        defaultProps: {
          configurable: true,
          get: function() {
            return defaultProps;
          },
          set: function(newDefaultProps) {
            warning$1(
              false,
              'React.lazy(...): It is not supported to assign `defaultProps` to ' +
                'a lazy component import. Either specify them where the component ' +
                'is defined, or create a wrapping component around it.'
            );
            defaultProps = newDefaultProps;
            // 更紧密地匹配生产行为：
            Object.defineProperty(lazyType, 'defaultProps', {
              enumerable: true
            });
          }
        },
        propTypes: {
          configurable: true,
          get: function() {
            return propTypes;
          },
          set: function(newPropTypes) {
            warning$1(
              false,
              'React.lazy(...): It is not supported to assign `propTypes` to ' +
                'a lazy component import. Either specify them where the component ' +
                'is defined, or create a wrapping component around it.'
            );
            propTypes = newPropTypes;
            // Match production behavior more closely:
            Object.defineProperty(lazyType, 'propTypes', {
              enumerable: true
            });
          }
        }
      });
    }
    return lazyType;
  }

  function forwardRef(render) {
    {
      if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
        warningWithoutStack$1(
          false,
          'forwardRef requires a render function but received a `memo` ' +
            'component. Instead of forwardRef(memo(...)), use ' +
            'memo(forwardRef(...)).'
        );
      } else if (typeof render !== 'function') {
        warningWithoutStack$1(
          false,
          'forwardRef requires a render function but was given %s.',
          render === null ? 'null' : typeof render
        );
      } else {
        !//不对0个参数发出警告，因为这可能是由于使用了“arguments”对象所致
        (render.length === 0 || render.length === 2)
          ? warningWithoutStack$1(
              false,
              'forwardRef render functions accept exactly two parameters: props and ref. %s',
              render.length === 1
                ? 'Did you forget to use the ref parameter?'
                : 'Any additional parameter will be undefined.'
            )
          : void 0;
      }

      if (render != null) {
        !(render.defaultProps == null && render.propTypes == null)
          ? warningWithoutStack$1(
              false,
              'forwardRef render functions do not support propTypes or defaultProps. ' +
                'Did you accidentally pass a React component?'
            )
          : void 0;
      }
    }
    return {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
  }

  function isValidElementType(type) {
    return (
      typeof type === 'string' ||
      typeof type === 'function' ||
      // 注：如果是多面填充，它的类型可能不是“symbol”或“number”。
      type === REACT_FRAGMENT_TYPE ||
      type === REACT_CONCURRENT_MODE_TYPE ||
      type === REACT_PROFILER_TYPE ||
      type === REACT_STRICT_MODE_TYPE ||
      type === REACT_SUSPENSE_TYPE ||
      (typeof type === 'object' &&
        type !== null &&
        (type.$$typeof === REACT_LAZY_TYPE ||
          type.$$typeof === REACT_MEMO_TYPE ||
          type.$$typeof === REACT_PROVIDER_TYPE ||
          type.$$typeof === REACT_CONTEXT_TYPE ||
          type.$$typeof === REACT_FORWARD_REF_TYPE))
    );
  }

  function memo(type, compare) {
    {
      if (!isValidElementType(type)) {
        warningWithoutStack$1(
          false,
          'memo: The first argument must be a component. Instead ' +
            'received: %s',
          type === null ? 'null' : typeof type
        );
      }
    }
    return {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: compare === undefined ? null : compare
    };
  }

  function resolveDispatcher() {
    var dispatcher = ReactCurrentDispatcher.current;
    !(dispatcher !== null)
      ? invariant(
          false,
          'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.'
        )
      : void 0;
    return dispatcher;
  }

  function useContext(Context, unstable_observedBits) {
    var dispatcher = resolveDispatcher();
    {
      !(unstable_observedBits === undefined)
        ? warning$1(
            false,
            'useContext() second argument is reserved for future ' +
              'use in React. Passing it is not supported. ' +
              'You passed: %s.%s',
            unstable_observedBits,
            typeof unstable_observedBits === 'number' &&
              Array.isArray(arguments[2])
              ? '\n\nDid you call array.map(useContext)? ' +
                  'Calling Hooks inside a loop is not supported. ' +
                  'Learn more at https://fb.me/rules-of-hooks'
              : ''
          )
        : void 0;

      // TODO: 为无效值添加更一般的警告。
      if (Context._context !== undefined) {
        var realContext = Context._context;
        // 不要删除重复数据，因为这会导致bug在现有的代码中不应该使用这个。
        if (realContext.Consumer === Context) {
          warning$1(
            false,
            'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' +
              'removed in a future major release. Did you mean to call useContext(Context) instead?'
          );
        } else if (realContext.Provider === Context) {
          warning$1(
            false,
            'Calling useContext(Context.Provider) is not supported. ' +
              'Did you mean to call useContext(Context) instead?'
          );
        }
      }
    }
    return dispatcher.useContext(Context, unstable_observedBits);
  }

  function useState(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }

  function useReducer(reducer, initialArg, init) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialArg, init);
  }

  function useRef(initialValue) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
  }

  function useEffect(create, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, inputs);
  }

  function useLayoutEffect(create, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, inputs);
  }

  function useCallback(callback, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, inputs);
  }

  function useMemo(create, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, inputs);
  }

  function useImperativeHandle(ref, create, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useImperativeHandle(ref, create, inputs);
  }

  function useDebugValue(value, formatterFn) {
    {
      var dispatcher = resolveDispatcher();
      return dispatcher.useDebugValue(value, formatterFn);
    }
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * 此源代码是根据在此源树根目录中的许可证文件。
   */
  var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * 此源代码是根据在此源树根目录中的许可证文件。
   */

  var printWarning$1 = function() {};

  {
    var ReactPropTypesSecret = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};

    printWarning$1 = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // 为了方便使用此堆栈，引发了此错误找到引发此警告的调用网站。
        throw new Error(message);
      } catch (x) {}
    };
  }

  /**
   * 断言这些值与类型规范匹配。
   * 错误信息会被存储，并且只会显示一次。
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(
    typeSpecs,
    values,
    location,
    componentName,
    getStack
  ) {
    {
      for (var typespecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typespecName)) {
          var error;
          // prop类型验证可能会引发。万一有，我们不想在渲染阶段失败，在此之前它没有失败。所以我们记录下来。
          // 这些东西清理干净后，我们就让他们抛出。
          try {
            // 这是故意捕获的不变量。是一样的没有此语句的行为，除非有更好的消息。
            if (typeof typeSpecs[typespecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') +
                  ': ' +
                  location +
                  ' type `' +
                  typeSpecName +
                  '` is invalid; ' +
                  'it must be a function, usually from the `prop-types` package, but received `' +
                  typeof typeSpecs[typeSpecName] +
                  '`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typespecName](
              values,
              typeSpecName,
              componentName,
              location,
              null,
              ReactPropTypesSecret
            );
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning$1(
              (componentName || 'React class') +
                ': type specification of ' +
                location +
                ' `' +
                typeSpecName +
                '` is invalid; the type checker ' +
                'function must return `null` or an `Error` but returned a ' +
                typeof error +
                '. ' +
                'You may have forgotten to pass an argument to the type checker ' +
                'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                'shape all require an argument).'
            );
          }
          if (
            error instanceof Error &&
            !(error.message in loggedTypeFailures)
          ) {
            // 只监视一次此故障，因为相同的错误。
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : '';
            printWarning$1(
              'Failed ' +
                location +
                ' type: ' +
                error.message +
                (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  var checkPropTypes_1 = checkPropTypes;

  /**
   * ReactElementValidator在元素工厂周围提供包装验证传递给元素的属性。这是为了仅在dev中使用，可以由语言的静态类型检查器替换支持它。
   */

  var propTypesMisspellWarningShown = void 0;

  {
    propTypesMisspellWarningShown = false;
  }

  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var name = getComponentName(ReactCurrentOwner.current.type);
      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }
    return '';
  }

  function getSourceInfoErrorAddendum(elementProps) {
    if (
      elementProps !== null &&
      elementProps !== undefined &&
      elementProps.__source !== undefined
    ) {
      var source = elementProps.__source;
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '';
    }
    return '';
  }

  /**
   * 如果没有在子元素的动态数组上显式设置键，则发出警告；或者对象键无效。这样我们就可以跟踪更新。
   */
  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    var info = getDeclarationErrorAddendum();
    if (!info) {
      var parentName =
        typeof parentType === 'string'
          ? parentType
          : parentType.displayName || parentType.name;
      if (parentName) {
        info =
          '\n\nCheck the top-level render call using <' + parentName + '>.';
      }
    }
    return info;
  }

  /**
   * 如果元素未分配显式键，则发出警告。
   * 此元素在数组中。阵列可以增大和缩小或重新排序。
   * 所有尚未验证的子项都必须为其分配“密钥”属性。
   * 缓存了错误状态，因此发出警告只显示一次。
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */
  function validateExplicitKey(element, parentType) {
    if (!element._store || element._store.validated || element.key !== null) {
      return;
    }
    element._store.validated = true;

    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }
    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

    // 通常现在的拥有者是罪犯，但如果它接受孩子作为属性，它可能是负责给它分配一个键。
    var childOwner = '';
    if (
      element &&
      element._owner &&
      element._owner !== ReactCurrentOwner.current
    ) {
      // 提供最初创建此子级的组件。
      childOwner =
        ' It was passed a child from ' +
        getComponentName(element._owner.type) +
        '.';
    }

    setCurrentlyValidatingElement(element);
    {
      warning$1(
        false,
        'Each child in a list should have a unique "key" prop.' +
          '%s%s See https://fb.me/react-warning-keys for more information.',
        currentComponentErrorInfo,
        childOwner
      );
    }
  }

  /**
   * 确保在静态位置传递每个元素，定义了显式键属性或在对象文本中的数组具有有效的键属性。
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */
  function validateChildKeys(node, parentType) {
    if (typeof node !== 'object') {
      return;
    }
    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];
        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // 此元素是在有效位置传递的。
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);
      if (typeof iteratorFn === 'function') {
        // 用于提供隐式键的入口迭代器，但现在我们稍后会为他们单独打印一个警告。
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step = void 0;
          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }

  /**
   * 给定一个元素，验证其props是否遵循proptypes定义，由类型提供。
   *
   * @param {ReactElement} element
   */
  function validatePropTypes(params) {
    var type = element.type;
    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }
    var name = getComponentName(type);
    var propTypes = void 0;
    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (
      typeof type === 'object' &&
      (type.$$typeof === REACT_FORWARD_REF_TYPE ||
        // 注意：备忘录只检查这里的外部道具。 内部props在调节器中检查。
        type.$$typeof === REACT_MEMO_TYPE)
    ) {
      propTypes = type.propTypes;
    } else {
      return;
    }
    if (propTypes) {
      setCurrentlyValidatingElement(element);
      checkPropTypes_1(
        propTypes,
        element.props,
        'prop',
        name,
        ReactDebugCurrentFrame.getStackAddendum
      );
      setCurrentlyValidatingElement(null);
    } else if (type.propTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true;
      warningWithoutStack$1(
        false,
        'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
        name || 'Unknown'
      );
    }
    if (typeof type.getDefaultProps === 'function') {
      !type.getDefaultProps.isReactClassApproved
        ? warningWithoutStack$1(
            false,
            'getDefaultProps is only used on classic React.createClass ' +
              'definitions. Use a static property named `defaultProps` instead.'
          )
        : void 0;
    }
  }

  /**
   * 给定一个Fragment，验证它只能提供Fragment属性
   * @param {ReactElement} fragment
   */
  function validateFragmentProps(fragment) {
    setCurrentlyValidatingElement(fragment);

    var keys = Object.keys(fragment.props);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key !== 'children' && key !== 'key') {
        warning$1(
          false,
          'Invalid prop `%s` supplied to `React.Fragment`. ' +
            'React.Fragment can only have `key` and `children` props.',
          key
        );
        break;
      }
    }

    if (fragment.ref !== null) {
      warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
    }

    setCurrentlyValidatingElement(null);
  }

  function createElementWithValidation(type, props, children) {
    var validType = isValidElementType(type);

    // 在这种情况下，我们会发出警告，但不要抛出。我们期望元素的创建成功，渲染中可能会出现错误。
    if (!validType) {
      var info = '';
      if (
        type === undefined ||
        (typeof type === 'object' &&
          type !== null &&
          Object.keys(type).length === 0)
      ) {
        info +=
          ' You likely forgot to export your component from the file ' +
          "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString = void 0;
      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
        info =
          ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      warning$1(
        false,
        'React.createElement: type is invalid -- expected a string (for ' +
          'built-in components) or a class/function (for composite ' +
          'components) but got: %s.%s',
        typeString,
        info
      );
    }
    var element = createElement.apply(this, arguments);

    // 如果使用模拟函数或自定义函数，则结果可能为空。
    // TODO:当不再允许将其作为类型参数时，删除此项。
    if (element == null) {
      return element;
    }

    // 如果类型自密钥验证逻辑以来无效，则跳过密钥警告不需要非字符串/函数类型，可能会引发令人困惑的错误。
    //  我们不希望异常行为在dev和prod之间有所不同（呈现将抛出一条有用的消息，并且一旦类型为已修复，将显示按键警告。）
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }
    return element;
  }

  function createFactoryWithValidation(type) {
    var validateFactory = createElementWithValidation.bind(null, type);
    validateFactory.type = type;
    // 旧钩子：移除它
    {
      Object.defineProperty(validateFactory, 'type', {
        enumerable: false,
        get: function() {
          lowPriorityWarning$1(
            false,
            'Factory.type is deprecated. Access the class directly ' +
              'before passing it to createFactory.'
          );
          Object.defineProperty(this, 'type', {
            value: type
          });
          return type;
        }
      });
    }
    return validatedFactory;
  }

  function cloneElementWithValidation(element, props, children) {
    var newElement = cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

  var React = {
    Children: {
      map: mapChildren,
      forEach: forEachchildren,
      count: countChildren,
      toArray: toArray,
      only: onlyChild
    },
    createRef: createRef,
    Component: Component,
    PureComponent: PureComponent,

    createContext: createContext,
    forwardRef: forwardRef,
    lazy: lazy,
    memo: memo,

    useCallback: useCallback,
    useContext: useContext,
    useEffect: useEffect,
    useImperativeHandle: useImperativeHandle,
    useDebugValue: useDebugValue,
    useLayoutEffect: useLayoutEffect,
    useMemo: useMemo,
    useReducer: useReducer,
    useRef: useRef,
    useState: useState,

    Fragment: REACT_FRAGMENT_TYPE,
    StrictMode: REACT_STRICT_MODE_TYPE,
    Suspense: REACT_SUSPENSE_TYPE,

    createElement: createElementWithValidation,
    cloneElement: cloneElementWithValidation,
    createFactory: createFactoryWithValidation,
    isValidElement: isValidElement,

    version: ReactVersion,

    unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
    unstable_Profiler: REACT_PROFILER_TYPE,

    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
  };

  // 注意：有些API添加了功能标志。
  // 确保稳定的开源版本不要修改react对象以避免Deopts。
  // 另外，我们不要在稳定的构建中公开它们的名称。
  if (enableStableConcurrentModeAPIs) {
    React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    React.Profiler = REACT_PROFILER_TYPE;
    React.unstable_ConcurrentMode = undefined;
    React.unstable_Profiler = undefined;
  }

  var React$2 = Object.freeze({
    default: React
  });

  var React$3 = (React$2 && React) || React$2;

  // TODO: 决定顶级导出表单。这很糟糕，但可以让它与Rollup和Jest一起使用。
  var react = React$3.default || React$3;

  return react;
});
