/**
 * Created by Moudi on 2017/5/26.
 */
import mongoose from 'mongoose';
const StatusModel = mongoose.model('Status');

class StatusApi {
  static update(payload) {
    const status = new StatusModel(payload);
    return status.save();
  }
  static get() {
    return StatusModel.find({}, '-_id').sort('-date').limit(1);
  }
}

export default StatusApi;
