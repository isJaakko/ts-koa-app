import sketchService from '../service/sketch';
import { ok } from '../utils/respose';

class SketchController {
  async getSketchList(ctx) {
    const files = await sketchService.getSketchFileList('yinjunjie.yjj', {}, {});
    ok(ctx, { files });
  }
}
export default new SketchController();
