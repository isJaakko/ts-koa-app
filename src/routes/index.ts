import Router from '@koa/router';
import demoRouter from './demo';
const router = new Router();

router.use(demoRouter);

export default router.route();
