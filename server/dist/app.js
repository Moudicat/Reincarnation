'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBetterBody = require('koa-better-body');

var _koaBetterBody2 = _interopRequireDefault(_koaBetterBody);

var _kcors = require('kcors');

var _kcors2 = _interopRequireDefault(_kcors);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default(); /**
                                * Created by Moudi on 2017/4/30.
                                */


app.use((0, _koaConvert2.default)(_kcors2.default));

app.use((0, _koaConvert2.default)((0, _koaBetterBody2.default)({
  fields: 'body'
})));

app.listen(8111, function () {
  console.log(111111);
});