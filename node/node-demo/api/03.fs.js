const fs = require('fs');
const path = require('path');
// const rs = fs.createReadStream(path.join(__dirname, './03.fs.js'));
// // 返回文件内容,这个会一点一点给,read是移除全给
// rs.pipe(process.stdout);

// 生成一点给一点
const ws = fs.createWriteStream('./test.txt');
let num = 0;
let timeId = setInterval(() => {
  num++;
  if (num >= 7) {
    clearInterval(timeId);
    ws.end();
  }
  ws.write('1');
}, 200);

ws.on('finish', () => {
  console.log('end');
});

/* read */
// fs.readFile(path.join(__dirname, './02.path.js'), 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log('======同步==================');
//   console.log(data);
// });

// const data = fs.readFileSync(path.join(__dirname, './02.path.js'), 'utf8');
// console.log('======async==================');
// console.log(data);

/* write */
// 也可以用来写buffer
// const content = 'this is a test'
// fs.writeFile(
//   path.join(__dirname, './02.test'),
//   content,
//   {
//     encoding: 'utf8'
//   },
//   err => {
//     if (err) throw err;
//     console.log('done');
//   }
// );

/* stat 对文件进行操作 */
// fs.stat(path.join(__dirname, './03.fs.js'), (err, stats) => {
//   if (err) throw err;
//   // 文件夹
//   console.log(stats.isDirectory());
//   // 是文件
//   console.log(stats.isFile());
// });

/* rename 重命名  */
// fs.rename(path.join(__dirname, '../test.txt'), 'text.txt', err => {
//   if (err) throw err;
//   console.log('done');
// });

/* unlink 删除文件 */
// fs.unlink(path.join(__dirname, '../text.txt'), err => {
//   if (err) throw err;
//   console.log('done');
// });

/* 读取文件夹 */
// fs.readdir('./', (err, files) => {
//   if (err) throw err;
//   console.log(files);
// });

/* mkdir创建 */
// fs.mkdir(path.join(__dirname, './test'), err => {
//   if (err) throw err;
//   console.log('done');
// });
/* rmdir 删除文件夹 */
// fs.rmdir(path.join(__dirname, './test'), err => {
//   if (err) throw err;
//   console.log('done');
// });

/* watch监听文件 */
// fs.watch(
//   path.join(__dirname, './'),
//   {
//     recursive: true
//   },
//   (eventType, filename) => {
//     // 修改 change/ 删除 新增 rename, 名称
//     console.log(eventType, filename);
//   }
// );
