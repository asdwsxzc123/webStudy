const {
  join,
  resolve,
  normalize,
  basename,
  extname,
  dirname,
  parse,
  format,
  sep,
  delimiter,
  win32,
  posix
} = require('path');
// 规范化
// console.log(normalize('./s'));
// // 路径拼接
// console.log(join('/user', 'local', 'bin'));
// console.log(join('/user', '../local', 'bin'));

// // 获取绝对路径
// console.log(resolve('./'));
// // 完整文件名
// console.log(basename('/home/li/Desktop/git/node-demo/01.process.js'));
// // 后缀
// console.log(extname('/home/li/Desktop/git/node-demo/01.process.js'));
// // 完整的文件夹路径
// console.log(dirname('/home/li/Desktop/git/node-demo/01.process.js'));

// // 解析文件名变对象形式
// console.log(parse('/home/li/Desktop/git/node-demo/01.process.js'));
// // 将对象转化成文件吗
// console.log(
//   format({
//     root: '/',
//     dir: '/home/li/Desktop/git/node-demo',
//     base: '01.process.js'
//     // ext: '.js',
//     // name: '01.process'
//   })
// );
// 分割符
// console.log(sep);
// console.log(win32.sep);

// console.log(delimiter);
// console.log(win32.delimiter);

// console.log(posix);
// console.log(process.env.PATH);

// 文件所在位置
console.log('__dir', __dirname);
// 当前执行位置
console.log('process.cwd()', process.cwd());
// 当前执行位置
console.log('path.resolve', resolve('./'));
console.log('s');
