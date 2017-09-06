/**
 * Created by Moudi on 2017/5/3.
*/
import mongoose from 'mongoose';
const BangumiModel = mongoose.model('Bangumi');

class BangumiApi {
  static async insert(payload) {
    const searchResult = await BangumiModel.find({id: payload.id});
    if (searchResult.length) {
      return await BangumiModel.findOneAndUpdate({id: payload.id}, payload)
    } else {
      const bangumi = new BangumiModel(payload);
      await bangumi.save();
      return bangumi;
    }
  }
  static async search(payload) {
    const searchResult = await BangumiModel.find({"titleTranslate.zh-Hans": {$regex: eval('/' + q + '/i')}}, 'titleTranslate');
    return searchResult;
  }
  static async getOne(id) {
    return await BangumiModel.findOne({_id: id});
  }
}

export default BangumiApi;
