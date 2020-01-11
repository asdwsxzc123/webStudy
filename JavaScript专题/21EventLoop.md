## 正文
### Event Loop是什么
event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop。

* 浏览器的Event Loop是在html5的规范中明确定义。
* NodeJS的Event Loop是基于libuv实现的。可以参考Node的官方文档以及libuv的官方文档。
* libuv已经对Event Loop做出了实现，而HTML5规范中只是定义了浏览器中Event Loop的模型，具体的实现留给了浏览器厂商。

### 宏队列和微队列
宏队列，macrotask，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括：

* setTimeout
* setInterval
* setImmediate (Node独有)
* requestAnimationFrame (浏览器独有)
* I/O
* UI rendering (浏览器独有)

微队列，microtask，也叫jobs。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：

* process.nextTick (Node独有)
* Promise
* Object.observe
* MutationObserver

### 浏览器的Event Loop
![eventloop](/img/js/EventLoop.png)

先执行栈中函数,然后执行微任务队列,然后执行宏任务队列

例子1: 

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);
```

```js
// 正确答案
1
4
7
5
2
3
6
```
例子2
```js
console.log(1); 

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
  
  Promise.resolve().then(() => {
    console.log(6)
  }).then(() => {
    console.log(7)
    
    setTimeout(() => {
      console.log(8)
    }, 0);
  });
})

setTimeout(() => {
  console.log(9);
})

console.log(10);
// 1,4,10,5,6,7,2,3,9,8
```
在执行微队列microtask queue中任务的时候，如果又产生了microtask，那么会继续添加到队列的末尾，也会在这个周期执行，直到microtask queue为空停止。


抄录自[带你彻底弄懂Event Loop](https://segmentfault.com/a/1190000016278115)