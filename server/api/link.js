import mongoose from 'mongoose';
const LinkModel = mongoose.model('Link');

class LinkApi {
  static list() {
    return LinkModel.find({});
  }
  static insert(linkInfo) {
    const link = new LinkModel(linkInfo);
    return link.save();
  }
  static update(linkInfo) {
    return LinkModel.findOneAndUpdate({_id: linkInfo._id});
  }
  static remove(id) {
    return LinkModel.findOneAndRemove({_id: id});
  }
}

export default LinkApi;
