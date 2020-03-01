const Server = require("./app");
const yargs = require("yargs");
// 配置行
const { argv } = yargs
  .usage("anywhere [options]")
  .option("p", {
    alias: "port",
    describle: "端口号",
    default: 9527
  })
  .option("h", {
    alias: "hostname",
    describle: "host",
    default: "127.0.0.1"
  })
  .option("d", {
    alias: "root",
    describle: "root path",
    default: process.cwd()
  });

const server = new Server(argv);
server.start();
