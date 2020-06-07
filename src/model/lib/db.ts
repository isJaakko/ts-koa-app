import mongoose from 'mongoose';
export { Schema } from 'mongoose';
import { config } from '../../../local-setting';

mongoose.connect(config.mongooseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default mongoose;
