/**
 * Created by Moudi on 2017/5/3.
 */
const Bangumi = require('../models/bangumi');

async function addBangumi(payload) {
  return await Bangumi.add(payload);
}

async function searchBangumi(payload) {
  return await Bangumi.search(payload);
}

module.exports = {
  addBangumi,
  searchBangumi
};