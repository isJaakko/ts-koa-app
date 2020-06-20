import Router from '@koa/router';
import demoRouter from './demo';
const router = new Router();

router.use(demoRouter.routes());

export default router;
