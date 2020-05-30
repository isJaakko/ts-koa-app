import sketchService from '../service/sketch';

class SketchController {
  getSketchList() {
    return sketchService.getSketchList();
  }
}
export default new SketchController();
