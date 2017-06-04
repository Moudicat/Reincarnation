/**
 * Created by Moudi on 2017/5/3.
 */
const mongoose = require('mongoose');
const bangumiSchema = require('./schemas/bangumi');

bangumiSchema.statics.add = async function (payload) {
  const bangumi = new this(payload);
  await bangumi.save();
  return bangumi;
};

bangumiSchema.statics.search = async function (q) {
  const searchResult = await this.find({"titleTranslate.zh-Hans": {$regex: eval('/' + q + '/i')}}, 'titleTranslate');
  return searchResult; // searchResult.map(e => e.titleTranslate['zh-Hans']);
};

module.exports = mongoose.model('Bangumi', bangumiSchema);