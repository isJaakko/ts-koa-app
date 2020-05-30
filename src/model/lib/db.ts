import mongoose from 'mongoose';
export { Schema } from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/pendah', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default mongoose;
