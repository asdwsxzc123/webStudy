const http = require("http");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { exec } = require("child_process");
const conf = require("./config/defaultConfig");

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }
  start() {
    const conf = this.conf;
    const server = http.createServer(async (req, res) => {
      const filePath = path.join(conf.root, req.url);

      await new Promise((resolve, reject) => {
        return fs.stat(filePath, async (err, stats) => {
          if (err) {
            res.statusCode = 404;
            res.setHeader("Context-Type", "text/plain");
            res.end(`${filePath} is not a directory or file`);
            reject(err);
            return;
          }
          if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader("Context-Type", "text/plain");
            await fs.createReadStream(filePath).pipe(res);
          } else if (stats.isDirectory()) {
            await fs.readdir(filePath, (err, files) => {
              if (err) throw err;
              res.setHeader("Context-Type", "text/plain");
              res.end(files.join("\r\n"));
            });
          }
        });
      });
      res.statusCode = 200;
      res.setHeader("Context-Type", "text/html");
      res.end(filePath);
    });

    server.listen(conf.port, conf.hostname, () => {
      const addr = `http://${conf.hostname}:${conf.port}`;
      console.info(chalk.green(addr));
      switch (process.platform) {
        case "darwin":
          exec(`open ${addr}`);
          break;
        case "win32":
          exec(`start ${addr}`);
          break;

        default:
          break;
      }
    });
  }
}

module.exports = Server;
