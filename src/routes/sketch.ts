import Router from '@koa/router';
import SketchController from '../controller/sketch';
import RawFileController from '../controller/rawFile';

const router = new Router({
  prefix: '/sketch'
});

router.get('/file/list', SketchController.getSketchList);
router.get('/:id', SketchController.getSketchFileNode);
router.get('/file/query', SketchController.getSketchFileQuery);
router.get('/file/cleaning', RawFileController.dataCleaning);

export default router;
