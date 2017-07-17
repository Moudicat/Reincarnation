/**
 * Created by Moudi on 2017/5/3.
 */
const mongoose = require('mongoose');
const bangumiSchema = require('./schemas/bangumi');

bangumiSchema.statics.add = async function (payload) {
  const searchResult = await this.find({_id: payload.id});
  console.log(searchResult);
  if (searchResult.length) {
    return await this.findOneAndUpdate({_id: payload.id}, payload)
  } else {
    const bangumi = new this(payload);
    await bangumi.save();
    return bangumi;
  }
};

bangumiSchema.statics.search = async function (q) {
  const searchResult = await this.find({"titleTranslate.zh-Hans": {$regex: eval('/' + q + '/i')}}, 'titleTranslate');
  return searchResult; // searchResult.map(e => e.titleTranslate['zh-Hans']);
};

bangumiSchema.statics.getOne = async function (id) {
  return await this.findOne({_id: id});
};

module.exports = mongoose.model('Bangumi', bangumiSchema);