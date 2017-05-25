/**
 * Created by Moudi on 2017/5/25.
 */
const mongoose = require('mongoose');
const statusSchema = require('./schemas/status');

statusSchema.statics.update = async function (payload) {
  const status = new this(payload);
  await status.save();
  return status;
};

statusSchema.statics.get = async function (q) {
  return await await this.find({}, '-_id').sort('-date').limit(1);
};

module.exports = mongoose.model('Status', statusSchema);