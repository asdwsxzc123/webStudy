// 1. 用于处理二进制数据流
// 2. 实例类似整数数组,大小固定
// 3. C++代码在V8堆外面

// const buf = Buffer.from('hello world', 'ascii');
// console.log(buf);

// // 变成2进制
// console.log(Buffer.alloc(10));

// // 字节长度
// console.log(Buffer.byteLength('test'));

// // 是不是buffer
// console.log(Buffer.isBuffer());

// // buffer拼接
// console.log(Buffer.concat([Buffer.from('12'), Buffer.from('sdf')]));

// // toString可以吧buffer转换成10进制
// console.log(Buffer.from('12').toString());
// console.log(Buffer.from('12').toString('base64'));

// 10进制长度,中文一个算3个长度
// console.log(Buffer.from('中文').length);

// const buf = Buffer.from('this is test');

// // fill,填充
// console.log(buf);
// console.log(buf.fill());

// // buf内容是否相等
// console.log(Buffer.from('1').equals(Buffer.from('123')));

// 打印中文
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
console.log(decoder.write(Buffer.from('哈哈')));
