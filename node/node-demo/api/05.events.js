const EventEmitter = require('events');
class CustomEvent extends EventEmitter {}
const ce = new CustomEvent();
// ce.ones('test', () => {
//   console.log('this is ones');
// });
const fn1 = ce.on('test', () => {
  console.log('this is fn1');
});
const fn2 = ce.on('test', () => {
  console.log('this is fn2');
});
setInterval(() => {
  ce.emit('test');
}, 1000);
// 移除单个
ce.removeListener('test', fn1);
// 移除所有该事件
ce.removeAllListener('test');
