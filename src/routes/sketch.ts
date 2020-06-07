import Router from '@koa/router';
import SketchController from '../controller/sketch';

const router = new Router({
  prefix: '/sketch'
});

router.get('/file/list', SketchController.getSketchList);
router.get('/:id', SketchController.getSketchFileNode);

export default router;
