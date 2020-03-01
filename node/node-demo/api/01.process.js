const { argv, argv0, execArgv, execpath, env } = process;
// console.log(argv0, execArgv, execpath);
console.log(process);
// process.env.cwd()
console.log(1);

// global
const var1 = 200;
global.var1 = var1;
module.exports.var1 = var1;
