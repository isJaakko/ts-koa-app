import db, { Schema } from './lib/db';

const rawFileSchema = new Schema(
  {
    md5: String,
    size: Number,
    type: String,
    mimetype: String,
    fileName: String,
    oid: String
  },
  { timestamps: true }
);

export const rawFileModel = db.model('raw_file', rawFileSchema);
