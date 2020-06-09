import { sketchFileModel } from '../model/sketchFile';
import mongoose from 'mongoose';

class SketchService {
  async getSketchFileNode(id) {
    return sketchFileModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
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
        $lookup: {
          from: 'users',
          localField: 'fileNode.owner',
          foreignField: 'username',
          as: 'owner'
        }
      },
      {
        $group: {
          _id: '$_id',
          fileNode: {
            $first: '$$ROOT'
          }
        }
      }
    ]);
  }

  getSketchFileList(owner: string, query: object, _pageInfo?: any) {
    // const { pageSize = 20, pageNumber = 1 } = pageInfo;

    return sketchFileModel.aggregate([
      {
        $sort: {
          _id: -1
        }
      },
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
          // quickAccess: true,
          deletedAt: null
        }
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
          'fileNode.owner': owner,
          ...query
        }
      },
      {
        $group: {
          _id: 'objectId'
        }
      },
      // {
      //   $skip: (Number(pageNumber) - 1) * Number(pageSize)
      // },
      // {
      //   $limit: Number(pageSize)
      // },
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
          lastViewedAt: 1,
          quickAccess: 1
        }
      }
    ]);
  }

  async getSketchArtboard(sid: string) {
    const [{ artboard }] = await sketchFileModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(sid)
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
        $project: {
          'artboard.sid': 1,
          'artboard.objectId': 1,
          'artboard.fileName': 1
        }
      }
    ]);

    return artboard;
  }

  async getSketchPage(sid: string) {
    const [{ page = {} } = {}] = await sketchFileModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(sid)
        }
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
        $project: {
          'page._id': 1,
          'page.objectId': 1,
          'page.sid': 1
        }
      }
    ]);

    return page;
  }

  getSketchCount(owner: string, query?: object) {
    return sketchFileModel.aggregate([
      {
        $sort: {
          _id: -1
        }
      },
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
        $count: 'count'
      }
    ]);
  }

  dataCleaning(_id) {
    // sketchFileModel.find({_id});
  }
}
export default new SketchService();
