import Router from '@koa/router';

const router = new Router({
  prefix: '/demo'
});

router.get('/', (ctx) => {
  ctx.body = 'demo111';
});

export default router;
