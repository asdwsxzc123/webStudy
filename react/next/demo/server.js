const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  router.get('/a/:id', async ctx => {
    const { id } = ctx.params;
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    });
    ctx.respond = false;
  });

  server.use(router.routes());
  server.use(async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.listen(3000, () => {
    console.log('服务启动: 端口3000');
  });
});
