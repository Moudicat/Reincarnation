/**
 * Created by Moudi on 2017/5/3.
 */
const express = require('express');
const router = express.Router();

router.use('/hitokoto', require('./hitokoto'));
router.use('/article', require('./article'));
router.use('/status', require('./status'));
router.use('/user', require('./user'));
router.use('/bangumi', require('./bangumi'));
router.use('/animation', require('./animation'));
router.use('/weather', require('./weather'));
router.use('/link', require('./link'));
router.use('/gugu', require('./gugu'));

module.exports = router;
