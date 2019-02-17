const net = require('net')
const server = net.createServer()
server.on('connection', (c) => {
  console.log('client connect');
  c.on('end', () => {
    console.log('client disconnect');
  })
  c.write('hello')
  c.on('data', data => {
    console.log(data.toString());
    
  })
})
server.on('error', (err) => {
  throw err;
})
server.listen(3000, () => {
  console.log('listen: 3000');
  
})