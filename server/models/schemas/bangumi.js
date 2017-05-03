/**
 * Created by Moudi on 2017/5/3.
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  id: String,
  title: String,
  titleTranslate: Object,
  lang: String,
  officialSite: String,
  begin: String,
  end: String,
  comment: String,
  sites: Array
});