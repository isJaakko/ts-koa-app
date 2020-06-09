import RawFileService from '../service/rawFile';
import { ok } from '../utils/respose';

class SketchController {
  async dataCleaning(ctx) {
    await RawFileService.dataCleaning();

    ok(ctx, {
      msg: 'ok'
    });
  }
}
export default new SketchController();
