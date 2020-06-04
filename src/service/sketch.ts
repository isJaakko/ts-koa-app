import { sketchFileModel } from '../model/sketchFile';

class SketchService {
  getSketchList() {
    //   return sketchModel.find({}).limit(10);

    return sketchFileModel.aggregate([
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

  async getSketchFileList(owner: string, query?: object, pageInfo?: any) {
    const { pageSize = 20, pageNumber = 1 } = pageInfo;

    const result = await sketchFileModel.aggregate([
      {
        $lookup: {
          from: 'raw_files',
          localField: 'fid',
          foreignField: '_id',
          as: 'file'
        }
      },
      {
        $unwind: '$file'
      },
      {
        $match: {
          ...query,
          deletedAt: null,
          lastViewedAt: null
        }
      },
      {
        $lookup: {
          from: 'sketch_layer_imgs',
          let: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            sketch_id: '$_id'
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$sid', '$$sketch_id'] }]
                }
              }
            },
            {
              $limit: 1
            }
          ],
          as: 'artboard'
        }
      },
      {
        $unwind: '$artboard'
      },
      {
        $lookup: {
          from: 'sketch_artboard_handoffs',
          let: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            sketch_id: '$_id'
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$sid', '$$sketch_id'] }]
                }
              }
            },
            {
              $limit: 1
            }
          ],
          as: 'page'
        }
      },
      {
        $unwind: '$page'
      },
      {
        $lookup: {
          from: 'file_versions',
          localField: 'file._id',
          foreignField: 'fid',
          as: 'fileVersions'
        }
      },
      {
        $unwind: '$fileVersions'
      },
      {
        $lookup: {
          from: 'file_system_nodes',
          localField: 'fileVersions.vid',
          foreignField: 'file',
          as: 'fileNode'
        }
      },
      {
        $unwind: '$fileNode'
      },
      {
        $match: {
          'fileNode.owner': owner
        }
      },
      {
        $skip: (Number(pageNumber) - 1) * Number(pageSize)
      },
      {
        $limit: Number(pageSize)
      },
      {
        $lookup: {
          from: 'users',
          localField: 'fileNode.owner',
          foreignField: 'username',
          as: 'owner'
        }
      },
      {
        $unwind: '$owner'
      },
      {
        $project: {
          objectId: 1,
          file: 1,
          fileNode: 1,
          'artboard.sid': 1,
          'artboard.objectId': 1,
          'artboard.fileName': 1,
          'page._id': 1,
          'page.objectId': 1,
          owner: 1,
          lastViewedAt: 1
        }
      }
    ]);

    return result;
  }
}
export default new SketchService();
