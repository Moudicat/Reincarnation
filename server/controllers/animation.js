/**
 * Created by Moudi on 2017/6/4.
 */
import AnimationApi from '../api/animation';
import BaseRouterController from './base/baseRouterController';
import { controller, get, patch, del } from '../decorators/router';
import authorization from '../middlewares/authorization';
import rplMiddleware from '../middlewares/rplMiddleware';

@controller('/animation', rplMiddleware)
export default class Animation extends BaseRouterController {

  @get('')
  get(req, res) {
    AnimationApi.get()
      .then(response => {
        res.resData.data = response;
        res.json(res.resData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }

  @get('latest')
  latest(req, res) {
   AnimationApi.getLatest()
     .then(response => {
       res.resData.data = response;
       res.json(res.resData);
     })
     .catch(err => {
       console.log(err);
       res.sendStatus(500);
     });
 }

 @get(':id')
 getOne(req, res) {
   AnimationApi.getOne(req.params.id)
     .then(response => {
       res.resData.data = response;
       res.json(res.resData);
     })
     .catch(err => {
       console.log(err);
       res.sendStatus(500);
     });
 }

 @patch('', authorization)
 insert(req, res) {
   if (req.body instanceof Array) {
     const animationArr = req.body;
     insert();
     function insert() {
       if (animationArr.length === 0) return;
       AnimationApi.insert(animationArr[0])
         .then(() => {
           animationArr.shift();
           insert();
         })
         .catch(err => {
           res.sendStatus(500);
           console.log(err);
           return;
         });
     }
     res.resData.msg = '添加成功，本次添加了' + req.body.length + '条数据';
     res.json(res.resData);
   } else if (typeof req.body === 'object') {
     AnimationApi.add(req.body)
       .then(() => {
         res.resData.msg = '添加成功，本次添加了1条数据';
         res.json(res.resData);
       })
       .catch(err => {
         res.sendStatus(500);
         console.log(err);
       });
   } else {
     res.sendStatus(400);
   }
 }

 @patch(':id', authorization)
 update(req, res) {
   AnimationApi.update(req.body)
     .then(() => {
       res.resData.msg = '修改成功';
       res.json(res.resData);
     })
     .catch(err => {
       res.sendStatus(500);
       console.log(err);
     });
 }

  @del(':id', authorization)
  del(req, res) {
    if (!req.params.id) {
      res.sendStatus(400);
      return;
    }
    AnimationApi.remove(req.params.id)
      .then(() => {
        res.resData.msg = '成功删除';
        res.json(res.resData);
      })
      .catch(err => {
        res.sendStatus(500);
        console.log(err);
      });
  }
}
