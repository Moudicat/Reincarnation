import mongoose from 'mongoose';
const LinkModel = mongoose.model('Link');

class LinkApi {
  static async list() {
    return await linkModel.find({});
  }
  static async add(linkInfo) {
    const link = new LinkModel(linkInfo);
    await link.save();
    return link;
  }
  static async update(linkInfo) {
    return await LinkModel.findOneAndUpdate({_id: linkInfo._id});
  }
  static async remove(id) {
    return await LinkModel.findOneAndRemove({_id: id});
  }
}

export default LinkApi;
