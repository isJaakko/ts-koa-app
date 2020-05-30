import sketchService from '../service/sketch';
import { ok } from '../utils/respose';

class SketchController {
  async getSketchList(ctx) {
    const files = await sketchService.getSketchList();
    ok(ctx, {
      files
    });
  }
}
export default new SketchController();
