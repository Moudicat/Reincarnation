/**
 * Created by Moudi on 2017/5/26.
 */
import mongoose from 'mongoose';
const StatusModel = mongoose.model('Status');

class StatusApi {
  static async update(payload) {
    const status = new StatusModel(payload);
    await status.save();
    return status;
  }
  static async get() {
    return await StatusModel.find({}, '-_id').sort('-date').limit(1);
  }
}

export default StatusApi;
