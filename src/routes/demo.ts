import * as Router from '@koa/router';

const router = new Router({
  prefix: '/demo'
});

router.get('/', () => {});

export default router.routes();
