/**
 * Created by Moudi on 2017/4/30.
 */
import Koa from 'koa';
import bodyParser from 'koa-better-body';
import kcors from 'kcors';
import convert from 'koa-convert';
import KoaRouter from 'koa-router';

const app = new Koa();

app.use(convert(kcors));

app.use(convert(bodyParser({
  fields: 'body'
})));

app.listen(8111, () => {
  console.log(111111);
});
