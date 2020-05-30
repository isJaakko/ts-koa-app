import { sketchModel } from '../model/sketch';

class SketchService {
  getSketchList() {
    //   return sketchModel.find({}).limit(10);

    return sketchModel.aggregate([
      {
        $match: {
          lastViewedAt: { $ne: null },
          quickAccess: true
        }
      },
      {
        $project: {
          _id: 1,
          objectId: 1,
          quickAccess: 1,
          lastViewedAt: 1
        }
      },
      {
        $limit: 20
      }
    ]);
  }
}
export default new SketchService();
