import Router from '@koa/router';
import mongoose, { Schema } from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/pendah', { useNewUrlParser: true });

const sketchSchema = new Schema({
  objectId: String,
  fid: {
    type: Schema.Types.ObjectId,
    ref: 'raw_file'
  },
  quickAccess: Boolean
});

const sketchModel = mongoose.model('sketch_file', sketchSchema);

const router = new Router({
  prefix: '/sketch'
});

const getSketchList = () => {
  //   return sketchModel.find({}).limit(10);

  return sketchModel.aggregate([
    {
      $lookup: {
        from: 'raw_files',
        localField: 'fid',
        foreignField: '_id',
        as: 'rawFile'
      }
    },
    {
      $unwind: '$rawFile'
    },
    {
      $limit: 20
    }
  ]);
};

router.get('/:id', async (ctx, next) => {
  const result = await getSketchList();
  ctx.body = '124';
  ctx.body = { files: result };
  next();
});

export default router;
