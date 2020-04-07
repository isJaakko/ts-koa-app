import * as Router from '@koa/router';

const router = new Router({
  prefix: '/demo'
});

router.get('/', async (ctx) => {
  ctx.body = 'demo!!!';
});

export default router.routes();
