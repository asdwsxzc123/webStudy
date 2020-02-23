const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const session = require('koa-session');
const Redis = require('ioredis');
const RedisSessionStore = require('./server/session-store');
const auth = require('./server/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
// 创建redis client
const redis = new Redis();

let index = 0;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ['Jokcy develop github app'];
  const SESSION_CONFIG = {
    key: 'jid',
    // maxAge: 60 * 1000,
    store: new RedisSessionStore(redis)
  };
  server.use(session(SESSION_CONFIG, server));
  // 配置处理github OAuth登录
  auth(server);

  router.get('/a/:id', async ctx => {
    const { id } = ctx.params;
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    });
    ctx.respond = false;
  });

  router.get('/api/user/info', async ctx => {
    const user = ctx.session.userInfo;
    if (!user) {
      ctx.status = 401;
      ctx.body = 'Need Login';
    } else {
      ctx.body = user;
      ctx.set('Content-Type', 'application/json');
    }
  });

  server.use(router.routes());
  server.use(async ctx => {
    // ctx.cookies.set('id', index, { httpOnly: true });
    // index += 1;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.listen(3000, () => {
    console.log('服务启动: 端口3000');
  });
});
