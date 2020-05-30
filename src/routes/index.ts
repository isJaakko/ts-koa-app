import Router from '@koa/router';
import demoRouter from './demo';
import sketchRouter from './sketch';
const router = new Router();

router.use(demoRouter.routes());
router.use(sketchRouter.routes());

export default router;
