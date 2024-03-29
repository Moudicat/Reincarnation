/**
 * Created by Moudi on 2017/5/3.
 */
const mongoose = require('mongoose');

const bangumiSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  title: String,
  titleTranslate: Object,
  lang: String,
  officialSite: String,
  begin: String,
  end: String,
  comment: String,
  sites: Array
}, {versionKey: false});

mongoose.model('Bangumi', bangumiSchema);
