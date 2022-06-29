/**
 * Created by Moudi on 2017/5/3.
*/
import mongoose from 'mongoose';
const BangumiModel = mongoose.model('Bangumi');

class BangumiApi {
  static async insert(payload) {
    const searchResult = await BangumiModel.find({id: payload.id});
    if (searchResult.length) {
      return BangumiModel.findOneAndUpdate({id: payload.id}, payload)
    } else {
      const bangumi = new BangumiModel(payload);
      await bangumi.save();
      return bangumi;
    }
  }
  static search(q) {
    return BangumiModel.find({"titleTranslate.zh-Hans": {$regex: eval('/' + q + '/i')}}, 'titleTranslate');;
  }
  static getOne(id) {
    return BangumiModel.findOne({_id: id});
  }
}

export default BangumiApi;
