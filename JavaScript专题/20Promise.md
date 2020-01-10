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


4. then返回promise/报错/普通值,普通函数当普通值返回
```js
// 1. then()方法返回的仍是一个Promise，并且返回Promise的resolve的值是上一个Promise的onFulfilled()函数或onRejected()函数的返回值。
  // 2. 如果在上一个Promise的then()方法回调函数的执行过程中发生了错误，那么会将其捕获到，并作为返回的Promise的onRejected函数的参数传入
  const PENDING = 'PENDING'
  const FULFILLED = 'FULFILLED'
  const REJECTED = 'REJECTED'
  function MyPromise(fn) {
    let _this = this;
    _this.value = null
    _this.season = null;
    _this.state = PENDING

    // 异步问题,需要引入异步队列
    _this.onFulfilledCb = []
    _this.onRejectedCb = []
    _this.resolve = function (value) {
      if (_this.state === PENDING) {
        _this.state = FULFILLED
        _this.value = value
        _this.onFulfilledCb.forEach(cb => cb())
      }
    }
    _this.reject = function (season) {
      if (_this.state === PENDING) {
        _this.state = REJECTED
        _this.season = season
        _this.onRejectedCb.forEach(cb => cb())
      }
    }
    // 解决抛错问题
    try {
      fn(_this.resolve, _this.reject)
    } catch (season) {
      _this.reject(season)
    }
  }

  MyPromise.prototype = {
    // 链式调用then,需要获取上一个then的返回值,如果为空,返回undefind
    then: function (onFulfilled, onRejected) {
      let self = this
      let promise2 = null
      promise2 = new MyPromise((resolve, reject) => {
        if (self.state === PENDING) {
          self.onFulfilledCb.push(() => {
            try {
              // 如果回调有返回值,设置返回值给value
              let x = onFulfilled(self.value)
              self.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }

          })
          self.onRejectedCb.push(() => {
            try {
              let x = onRejected(self.season)
              self.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }

          })
        }
        if (self.state === FULFILLED) {
          try {
            let x = onFulfilled(self.value)
            self.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }
        if (self.state === REJECTED) {
          try {
            let x = onRejected(self.season)
            self.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }

        }
      })
      return promise2
    },
    // 链式调用then,需要获取上一个then的返回值,如果为空,返回undefind
    resolvePromise: function (promise2, x, resolve, reject) {
      let self = this;
      let called = false; // 防止 多次调用
      if (promise2 === x) {
        return reject(new TypeError('循环引用'))
      }

      // 如果是对象或函数,且不是null
      if (x !== null && (Object.prototype.toString.call(x) === '[object Function]' || Object.prototype.toString.call(x) === '[object Object]')) {
        try {
          let then = x.then;
          if (typeof then === 'function') {
            then.call(x, (value) => {
              if (called) return
              called = true;
              self.resolvePromise(promise2, value, resolve, reject)
            }, (season) => {
              if (called) return
              called = true;
              reject(season)
            })
          } else {
            if (called) return
            called = true;
            resolve(x)
          }
        } catch (error) {
          if (called) return
          called = true;
          reject(error)
        }
      } else {
        resolve(x)
      }

    }
  }
  let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 111);
  }).then(res => {

    return new MyPromise((resove, reject) => {
      resove('prmose')
    })
  }).then(res => {
    console.log('res2', res)
  }, err => console.log(err)).then(res => {
    console.log('res3', res)
  })
```

抄录自[从0到1实现Promise](https://segmentfault.com/a/1190000016550260)
[promise 规范](https://promisesaplus.com/)
