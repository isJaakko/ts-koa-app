import db, { Schema } from './lib/db';

const rawFileSchema = new Schema({
  objectId: String,
  fid: {
    type: Schema.Types.ObjectId,
    ref: 'raw_file'
  },
  quickAccess: Boolean
});

export const rawFileModel = db.model('raw_file', rawFileSchema);
