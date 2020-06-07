import sketchService from '../service/sketch';
import { ok } from '../utils/respose';

class SketchController {
  async getSketchList(ctx) {
    // eslint-disable-next-line no-undef
    const [fileNodes, [{ count }]] = await Promise.all([
      sketchService.getSketchFileList('yinjunjie.yjj', {}, {}),
      sketchService.getSketchCount('yinjunjie.yjj', {})
    ]);

    const [pages, artboards]: Array<any> = await Promise.all([
      Promise.all(
        fileNodes.map((file) => {
          return sketchService.getSketchPage(file._id);
        })
      ),
      Promise.all(
        fileNodes.map((file) => {
          return sketchService.getSketchArtboard(file._id);
        })
      )
    ]);

    const files = fileNodes.map((file, index) => ({
      ...file,
      page: pages[index],
      artboard: artboards[index]
    }));

    ok(ctx, {
      files,
      pageInfo: {
        filesLength: files.length,
        count
      }
    });
  }

  async getSketchFileNode(ctx) {
    const sketchFile = await sketchService.getSketchFileNode(ctx.params.id);
    ok(ctx, sketchFile);
  }
}
export default new SketchController();
