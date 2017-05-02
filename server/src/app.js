/**
 * Created by Moudi on 2017/4/30.
 */
const Koa = require('koa');
const bodyParser = require('koa-better-body');
// const kcors = require('kcors');
const convert = require('koa-convert');
const Router = require('koa-router');

const app = new Koa();

const router = new Router();
// app.use(kcors);

app.use(convert(bodyParser({
  fields: 'body'
})));

app.use(async (ctx) => {
  ctx.body = {
    url: ctx.url,
    request: ctx.request.body
  };
});

app.listen(8111, () => {
  console.log('监听开始');
});
