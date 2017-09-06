import express from 'express';

export default class BaseRouterController {
  constructor() {
    this.router = express.Router();
    for (const {method, url, middleware, fnName} of this.$routes) {
      this.router[method](url, ...middleware, this[fnName].bind(this));
    }
  }
}
