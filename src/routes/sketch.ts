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

router.get('/:id', async (ctx, next) => {
  const result = await sketchModel.find({}).limit(10);
  ctx.body = '124';
  ctx.body = { files: result };
  next();
});

export default router;
