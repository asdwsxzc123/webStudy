## Promise
1. 基本架构
```js
 // 三种状态
    const PENDING = 'pending' // 运行中
    const RESOLVED = 'resolved' // 成功
    const REJECTED = 'rejected' // 失败
    function MyPromise(fn) {
      let _this = this;
      // promise有2个函数,注册resolve和reject
      _this.resolve = function (value) {
        console.log(value)
      }
      _this.reject = function (season) {

      }

      // 执行promise回调,需要放在trycatch中,要不然异常无法捕获
      try {
        fn(_this.resolve, _this.reject)
      } catch (e) {
        _this.reject(e)
      }

    }
    let myPromise = new MyPromise(resolve => {
      setTimeout(() => {
        console.log(2)
        return resolve(1)
      });
    }, reject => {
      return reject()
    })
```

2. 添加状态机和then的调用
  添加状态机,添加then

  Promise是一个状态机的机制，初始状态为 pending，成功状态为 fulfilled，失败状态为 rejected。只能从 pending -> fulfilled，或者从 pending -> rejected，并且状态一旦转变，就永远不会再变了。
    
  所以，我们需要为Promise添加一个状态流转的机制。

  Promise拥有一个then方法，接收两个函数 onFulfilled 和 onRejected，分别作为Promise成功和失败的回调。所以，在then方法中我们需要对状态state进行判断，如果是fulfilled，则执行onFulfilled(value)方法，如果是rejected，则执行onRejected(reason)方法。
    
  由于成功值value和失败原因reason是由用户在executor中通过resolve(value) 和 reject(reason)传入的，所以我们需要有一个全局的value和reason供后续方法获取
```js
    const PENDING = 'pending' // 运行中
    const FULFILLED = 'fulfilled' // 成功
    const REJECTED = 'rejected' // 失败
    function MyPromise(fn) {
      let _this = this;
      // 注册全局value和reason
      _this.state = PENDING;
      _this.value = undefined;
      _this.reason = undefined;
      // promise有2个函数,注册resolve和reject
      _this.resolve = function (value) {
        if (_this.state === PENDING) {
          _this.state = FULFILLED
          _this.value = value
        }
      }
      _this.reject = function (reason) {
        if (_this.state === PENDING) {
          _this.state = REJECTED
          _this.reason = reason
        }

      }

      // 执行promise回调,需要放在trycatch中,要不然异常无法捕获
      try {
        fn(_this.resolve, _this.reject)
      } catch (reason) {
        _this.reject(reason)
      }

    }

    MyPromise.prototype = {
      then: function (onFulfilled, onRejected) {
        let self = this;
        if (self.state === FULFILLED) {
          onFulfilled(self.value)
        }
        if (self.state === REJECTED) {
          onRejected(self.reason)
        }
      }
    }
    let myPromise = new MyPromise(resolve => {
      console.log('res')
      return resolve(1)
    }, reject => {
      console.log('e')
      return reject()
    })
      .then(function (value) {
        console.log('then-value', value);
      }, function (reason) {
        console.log('then-reason', reason);
      })
```

3.  实现异步调用resolve

    同步调用resolve()没有问题，但如果是异步调用，比如放到setTimeout中，因为目前的代码在调用then()方法时，state仍是pending状态，当timer到时候调用resolve()把state修改为fulfilled状态，但是onFulfilled()函数已经没有时机调用了。
```js
    const PENDING = 'pending' // 运行中
    const FULFILLED = 'fulfilled' // 成功
    const REJECTED = 'rejected' // 失败
    function MyPromise(fn) {
      let _this = this;
      // 注册全局value和reason
      _this.state = PENDING;
      _this.value = undefined;
      _this.reason = undefined;

      // 添加fulfilledCb,rejectCb队列
      _this.onFulfilledCallbacks = []
      _this.onRejectedCallbacks = []
      // promise有2个函数,注册resolve和reject
      _this.resolve = function (value) {
        if (_this.state === PENDING) {
          _this.state = FULFILLED
          _this.value = value
          _this.onFulfilledCallbacks.forEach(cb => cb())
        }
      }
      _this.reject = function (reason) {
        if (_this.state === PENDING) {
          _this.state = REJECTED
          _this.reason = reason
          _this.onRejectedCallbacks.forEach(cb => cb())
        }

      }

      // 执行promise回调,需要放在trycatch中,要不然异常无法捕获
      try {
        fn(_this.resolve, _this.reject)
      } catch (reason) {
        _this.reject(reason)
      }

    }

    MyPromise.prototype = {
      then: function (onFulfilled, onRejected) {
        let self = this;

        // 状态机在pending状态,添加异步执行队列
        if (self.state === PENDING) {
          self.onFulfilledCallbacks.push(() => {
            onFulfilled(self.value)
          })
          self.onRejectedCallbacks.push(() => {
            onRejected(self.reason)
          })
        }

        if (self.state === FULFILLED) {
          onFulfilled(self.value)
        }
        if (self.state === REJECTED) {
          onRejected(self.reason)
        }
      }
    }
    let myPromise = new MyPromise(resolve => {
      setTimeout(() => {
        console.log('res')
        return resolve(1)
      }, 3000);
    }, reject => {
      console.log('e')
      return reject()
    })
      .then(function (value) {
        console.log('then-value', value);
      }, function (reason) {
        console.log('then-reason', reason);
      })
```


抄录自[从0到1实现Promise](https://segmentfault.com/a/1190000016550260)
[promise 规范](https://promisesaplus.com/)
