import { rawFileModel } from '../model';

class RawFileService {
  async dataCleaning() {
    const rawFiles = await rawFileModel.find({ fileName: { $regex: /%/ } });

    for (const file of rawFiles) {
      const fileName = await decodeURI(file.fileName);

      await rawFileModel.updateOne(
        { _id: file._id },
        {
          fileName
        }
      );
      //   console.log(result);
    }
  }
}
export default new RawFileService();
