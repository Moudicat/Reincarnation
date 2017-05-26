/**
 * Created by Moudi on 2017/5/3.
 */
const express = require('express');
const router = express.Router();

router.use('/bangumi', require('./bangumi'));
router.use('/user', require('./user'));
router.use('/article', require('./article'));
router.use('/hitokoto', require('./hitokoto'));
router.use('/status', require('./status'));
router.use('/weather', require('./weather'));

module.exports = router;
